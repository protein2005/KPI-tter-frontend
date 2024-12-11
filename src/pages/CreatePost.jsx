import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../redux/slices/auth';
import Header from '../components/Header';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = Cookies.get('auth_token');

  React.useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    }
  }, [dispatch, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.length > 140) {
      setError('Пост має бути не більше 140 символів.');
      return;
    }

    try {
      const { data } = await axios.post(
        `/users/${userData?.username}/posts`,
        { content },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        },
      );
      navigate(`/profile/${userData?.username}`);
    } catch (err) {
      setError('Помилка при створенні посту.');
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5 col-md-6">
        <h2>Створити пост</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Текст посту
            </label>
            <textarea
              id="content"
              className="form-control"
              rows="4"
              maxLength="140"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError('');
              }}></textarea>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">
            Опублікувати
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
