import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RiEmotionSadLine } from 'react-icons/ri';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = Cookies.get('auth_token');

  if (!token) {
    return (
      <div className="container__center d-flex justify-content-center align-items-center vh-100">
        <div style={{ textAlign: 'center' }}>
          <RiEmotionSadLine size={170} />
          <h1>403 - Ой, щось пішло не так!</h1>
          <p>Ви не маєте доступу до цієї сторінки.</p>
          <p>
            Будь ласка,{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/login')}>
              {' '}
              увійдіть
            </span>
            , щоб продовжити.
          </p>
        </div>
      </div>
    );
  }
  return element;
};

export default ProtectedRoute;
