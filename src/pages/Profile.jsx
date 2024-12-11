import React from 'react';
import axios from '../axios';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';

function Profile() {
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const { username } = useParams();

  React.useEffect(() => {
    const getUserInfo = async (username) => {
      try {
        const { data } = await axios.get(`/users/${username}`);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo(username);

    const getUserPosts = async (username, page = 1) => {
      const token = Cookies.get('auth_token');
      try {
        const { data } = await axios.get(`/users/${username}/posts`, {
          params: { page },
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserPosts(username);
  }, [username]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        {user ? (
          <div className="mb-4 text-center">
            <h3 className="fw-bold">
              {user.full_name} <span className="text-muted">(@{user.username})</span>
            </h3>
            <p className="text-muted">Публікацій: {user.posts}</p>
          </div>
        ) : (
          <p className="text-center text-muted">{`Користувача з ім'ям @${username} не знайдено.`}</p>
        )}

        {posts.length > 0 ? (
          <div className="row">
            {posts.map((post) => (
              <Post post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">Немає доступних постів.</p>
        )}
      </div>
    </>
  );
}

export default Profile;
