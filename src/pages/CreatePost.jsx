import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../redux/slices/auth';
import Header from '../components/Header';
import { RiSendPlaneFill } from 'react-icons/ri';
import Footer from '../components/Footer';

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
      <div className="container mt-5 col-md-6 mb-5">
        <h2 className="text-center mb-4">Створити пост</h2>
        <form onSubmit={handleSubmit} className="shadow-sm card p-4 rounded">
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Текст посту
            </label>
            <textarea
              id="content"
              className={`form-control ${content.length > 140 ? 'border-danger' : ''}`}
              rows="6"
              maxLength="140"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError('');
              }}
              placeholder="Поділіться своїми думками..."
            />
            <div className="d-flex justify-content-between mt-2">
              <small className={`text-muted ${content.length > 140 ? 'text-danger' : ''}`}>
                {140 - content.length} символів залишилось
              </small>
              {error && <small className="text-danger">{error}</small>}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center justify-content-center w-100"
            disabled={content.length === 0 || content.length > 140}>
            <RiSendPlaneFill size={18} className="me-2" />
            Опублікувати
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
