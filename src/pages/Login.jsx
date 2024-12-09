import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../redux/slices/auth';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('user_1');
  const [password, setPassword] = useState('12345678');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLogin({ username, password }));
  };

  React.useEffect(() => {
    if (status === 'succeeded') {
      navigate('/');
    }
  }, [status, navigate]);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Увійти</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Логін
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Пароль
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={status === 'loading'}>
                  {status === 'loading' ? 'Завантаження...' : 'Увійти'}
                </button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {status === 'succeeded' && (
                <div className="alert alert-success mt-3">Ви успішно увійшли!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
