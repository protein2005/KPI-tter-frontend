import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={
          <div className="container">
            <h2>Register</h2>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
