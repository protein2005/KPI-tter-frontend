import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../redux/slices/auth';

const Register = () => {
  const [username, setUsername] = useState('pirozchenka2');
  const [password, setPassword] = useState('Qwerty123123');
  const [fullName, setFullName] = useState('Pirozhenka');
  const { registerStatus, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchRegister({ username, password, fullName }));
  };

  useEffect(() => {
    console.log('Register Status:', registerStatus);
    if (registerStatus === 'succeeded') {
      navigate('/login');
    }
  }, [registerStatus, navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mt-5 mb-4">Реєстрація</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Повне ім'я
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Ім'я користувача
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Зареєструватися
            </button>
          </form>
          <div className="text-center mt-3">
            <Link to="/login">Вже маєте аккаунт? Увійти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
