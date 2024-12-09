import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/auth';
import { fetchMe } from '../redux/slices/auth';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { userData } = useSelector((state) => state.auth);

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
        <h1 className="h4 mb-0">KPI-tter</h1>
        <div>
          {isLoggedIn ? (
            <>
              <span className="me-3 fw-semibold">{userData?.username}</span>
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
