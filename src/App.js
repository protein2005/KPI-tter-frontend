import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import FullPost from './pages/FullPost';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:username" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/create-post" element={<ProtectedRoute element={<CreatePost />} />} />
      <Route path="/post/:username/:post_id" element={<ProtectedRoute element={<FullPost />} />} />
      <Route path="*" element={<h1>404: Not Found</h1>} />
    </Routes>
  );
}

export default App;
