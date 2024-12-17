import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import { FaRegComment, FaRegThumbsUp } from 'react-icons/fa';

function FullPost() {
  const { username, post_id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(true);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = Cookies.get('auth_token');
        const { data } = await axios.get(`/users/${username}/posts/${post_id}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setPost(data);
      } catch (error) {
        console.error(error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [username, post_id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComment('');
    setShowCommentInput(false);
  };

  const toggleLike = async () => {
    setIsLiking(true);
    const token = Cookies.get('auth_token');
    const url = `/users/${username}/posts/${post_id}/like`;

    try {
      if (post.is_liked) {
        // Прибрати лайк
        await axios.delete(url, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setPost((prev) => ({ ...prev, is_liked: false, likes: prev.likes - 1 }));
      } else {
        // Поставити лайк
        await axios.put(
          url,
          {},
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          },
        );
        setPost((prev) => ({ ...prev, is_liked: true, likes: prev.likes + 1 }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (!post) {
    return <div>Пост не знайдений.</div>;
  }

  return (
    <>
      <Header />
      <h1 className="text-center mt-5">Пост від автора</h1>
      <div className="container col-md-6 mt-5 mb-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{post.author.full_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              @{post.author.username} • {new Date(post.created_at).toLocaleString('uk-UA')}
            </h6>
            <p className="card-text mt-3">{post.content}</p>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <span>Лайків: {post.likes}</span>
            <div className="d-flex gap-2">
              <button
                className={`btn btn-sm ${post.is_liked ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={toggleLike}
                disabled={isLiking}>
                <FaRegThumbsUp />
              </button>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setShowCommentInput(!showCommentInput)}>
                <FaRegComment />
              </button>
            </div>
          </div>
        </div>
        {showCommentInput && (
          <div className="card mt-3">
            <div className="card-body">
              <form onSubmit={handleCommentSubmit}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Напишіть коментар..."
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Відправити
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FullPost;
