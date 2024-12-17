import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/auth';
import { fetchMe } from '../redux/slices/auth';
import { RiLogoutCircleRLine, RiAddCircleLine, RiUserLine, RiEarthLine } from 'react-icons/ri'; // Іконки з react-icons

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
        {/* Логотип і назва */}
        <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
          <RiEarthLine size={24} className="me-2" />
          <h1 className="h4 mb-0">KPI-tter</h1>
        </Link>

        {/* Меню */}
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/create-post"
                title="Створити пост"
                className="btn btn-sm btn-outline-primary me-2 hover-shadow">
                <RiAddCircleLine size={20} className="me-1" /> Створити пост
              </Link>
              <Link
                to={`/profile/${userData?.username}`}
                title="Профіль"
                className="btn btn-sm btn-outline-secondary me-2 hover-shadow">
                <RiUserLine size={20} className="me-1" /> {userData?.username}
              </Link>
              <button
                className="btn btn-sm btn-outline-danger hover-shadow"
                onClick={handleLogout}
                title="Вийти">
                <RiLogoutCircleRLine size={20} /> Вийти
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm btn-outline-primary me-2 hover-shadow"
                title="Увійти">
                <RiUserLine size={20} className="me-1" /> Увійти
              </Link>
              <Link
                to="/register"
                className="btn btn-sm btn-outline-success hover-shadow"
                title="Створити аккаунт">
                <RiAddCircleLine size={20} className="me-1" /> Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
