import React from 'react';
import axios from '../axios';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import { RiUserFollowLine, RiMessage2Line, RiGroupLine, RiFileTextLine } from 'react-icons/ri';
import { RiErrorWarningLine } from 'react-icons/ri';

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

  console.log(user);

  return (
    <>
      <Header />
      <div className="container mt-5">
        {user ? (
          <div className="row">
            {/* Ліва секція профілю */}
            <div className="col-md-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    <img
                      src={
                        user.avatar || 'https://api.dicebear.com/9.x/adventurer/svg?seed=Liliana'
                      }
                      alt="Аватар користувача"
                      className="rounded-circle"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    {user.full_name && <h5 className="mt-1">{user.full_name}</h5>}
                    <p className="text-muted">@{user.username}</p>
                  </div>
                  <div className="mb-3">
                    <p>
                      <RiGroupLine size={18} className="me-1" />
                      Підписники: <strong>1042</strong>
                    </p>
                    <p>
                      <RiUserFollowLine size={18} className="me-1" />
                      Підписки: <strong>101</strong>
                    </p>
                    <p>
                      <RiFileTextLine size={18} className="me-1" />
                      Пости: <strong>{user.posts}</strong>
                    </p>
                  </div>
                  <div>
                    <button className="btn btn-primary btn-sm me-2">
                      <RiUserFollowLine size={16} className="me-1" /> Підписатися
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <RiMessage2Line size={16} className="me-1" /> Написати
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Права секція постів */}
            <div className="col-md-8">
              <h4 className="mb-4">Пости</h4>
              {posts.length > 0 ? (
                <div className="row">
                  {posts.map((post) => (
                    <div className="col-md-4 mb-4" key={post.id}>
                      <Post post={post} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Немає доступних постів.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <RiErrorWarningLine size={120} color="#aaa" />
            <h4 className="text-center text-muted mt-3">
              {`Користувача з ім'ям @${username} не знайдено.`}
            </h4>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
