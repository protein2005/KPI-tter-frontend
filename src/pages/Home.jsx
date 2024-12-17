import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';
import Subscribe from '../components/Subscribe';
import PopularPosts from '../components/PopularPosts';

const Home = () => {
  const mockPosts = [
    {
      id: 1,
      content: 'Перший пост на KPI-tter! Це наш новий інноваційний простір для студентів.',
      author: { full_name: 'Іван Петренко', username: 'ivan_petrenko' },
      created_at: '2024-06-27T12:00:00Z',
      likes: 10,
      is_liked: false,
    },
    {
      id: 2,
      content: 'Не забудьте про дедлайни курсових! Плануйте свій час разом з KPI-tter.',
      author: { full_name: 'Марія Коваленко', username: 'maria_koval' },
      created_at: '2024-06-28T15:30:00Z',
      likes: 23,
      is_liked: true,
    },
    {
      id: 3,
      content: 'Цікава стаття про нові можливості в IT-галузі. Читайте та розвивайтесь!',
      author: { full_name: 'Олександр Іванов', username: 'oleksandr_iv' },
      created_at: '2024-06-29T09:45:00Z',
      likes: 17,
      is_liked: false,
    },
  ];
  return (
    <div>
      <Header />
      <main className="container mt-5 mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Вітаємо на нашому сайті!</h2>
          <p className="text-muted">Тут ви можете знайти цікаві функції.</p>
        </div>
        <PopularPosts posts={mockPosts} />
        <AboutUs />
        <Subscribe />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
