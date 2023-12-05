import React, { useState, useEffect } from 'react';

import Begin from './components/Begin';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Search from './components/Search';
import Chats from './components/Chats';
import Profile from './components/Profile';
import Profile_empresa from './components/Profile_empresa';
import Profile_user from './components/Profile_user';
import Settings from './components/Settings';
import Admin from './components/Admin';


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const body = { client_email: localStorage.client_email, client_password: localStorage.client_password };
      const response = await fetch("http://18.220.124.246:4000/users/login", {
        method: "POST",
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      parseRes.token ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Begin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/home" />} />
          <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login" />} />
          <Route path="/home" element={isAuthenticated ? <Home setAuth={setAuth} /> : <Navigate to="/login" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/empresa/:empresa" element={<Profile_empresa />} />
          <Route path="/:name" element={<Profile_user />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;