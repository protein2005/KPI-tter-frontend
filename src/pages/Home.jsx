import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="container mt-5">
        <h2>Вітаємо на нашому сайті!</h2>
        <p>Тут ви можете знайти цікаві функції.</p>
      </main>
    </div>
  );
};

export default Home;
