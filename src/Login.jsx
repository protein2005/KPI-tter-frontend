import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Очистити помилку перед новою спробою

    const encodedCredentials = btoa(`${username}:${password}`); // Base64 кодування

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Тіло запиту з логіном і паролем
      });

      // Перевіряємо статуси відповіді
      if (response.status === 204) {
        // Успішна аутентифікація, без виведення контенту
        setIsLoggedIn(true);
        console.log('Login successful');
        fetchUserDetails(); // Запит на отримання даних користувача після успішного входу
      } else if (response.status === 401) {
        // Логін або пароль невірні
        const data = await response.json();
        setError(data.detail || 'Логін або пароль невірні');
      } else if (response.status === 422) {
        // Помилка валідації
        const data = await response.json();
        const validationError = data.detail ? data.detail[0].msg : 'Невірні дані';
        setError(`Помилка: ${validationError}`);
      } else {
        // Обробка інших помилок
        setError('Не вдалося підключитися до сервера або невідомий статус');
      }
    } catch (err) {
      console.error('Помилка під час запиту:', err);
      setError('Не вдалося підключитися до сервера. Перевірте своє з’єднання.');
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/me', {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`, // Той самий Basic Auth
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data); // Зберігаємо дані користувача
      } else if (response.status === 401) {
        setError('Не вдалося отримати інформацію про користувача, ви не увійшли.');
      } else {
        setError('Не вдалося підключитися до сервера або невідомий статус');
      }
    } catch (err) {
      console.error('Помилка під час запиту до /api/me:', err);
      setError('Не вдалося отримати дані користувача');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Логін</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Логін:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Пароль:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Увійти</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoggedIn && <p style={{ color: 'green' }}>Ви увійшли!</p>}

      {/* Якщо користувач увійшов, вивести інформацію */}
      {userData && (
        <div>
          <h3>Інформація про користувача:</h3>
          <p>Логін: {userData.username}</p>
          <p>Повне ім'я: {userData.full_name || 'Не вказано'}</p>
          <p>Пости: {userData.posts}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
