import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/auth';
import { fetchMe } from '../redux/slices/auth';

const Header = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    navigate('/login');
  };

  React.useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setIsLoggedIn(true);
      dispatch(fetchMe({ token }));
    }
  }, [dispatch]);

  return (
    <header className="bg-light py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
          <h1 className="h4 mb-0">KPI-tter</h1>
        </Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/create-post" title="Створити пост" className="btn btn-success btn-sm me-2">
                Створити пост
              </Link>
              <Link
                to={`/profile/${userData?.username}`}
                title="Профіль"
                className="btn btn-primary btn-sm me-2">
                {userData?.username}
              </Link>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm me-2">
                Увійти
              </Link>
              <Link to="/register" className="btn btn-outline-primary btn-sm">
                Створити аккаунт
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
