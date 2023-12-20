import React, { useState, useEffect, createContext } from "react";

import {
  Admin,
  Begin,
  Register,
  Login,
  Home,
  Search,
  Chats,
  BusinessProfile,
  UserProfile,
  Review,
  Settings,
  Testing,
  Notifications,
} from "./pages";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AppProvider from "./providers/AppProvider";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const FunctionContext = createContext();

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const body = {
        client_email: localStorage.client_email,
        client_password: localStorage.client_password,
      };
      const response = await fetch("http://3.18.112.92:4000/users/login", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <main
      className={`bg-[#EEEFEF] w-full flex gap-1 pt-20 pb-14 lg:p-0 lg:pb-0 ${
        darkMode ? "dark-login-bg" : ""
      }`}
    >
      <Router>
        <AppProvider darkMode={darkMode} FunctionContext={FunctionContext}>
          <Routes>
            <Route path="/" element={<Begin />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to="/home" />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register setAuth={setAuth} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <Home
                    setAuth={setAuth}
                    darkMode={darkMode}
                    FunctionContext={FunctionContext}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/review/:review"
              element={
                <Review
                  setAuth={setAuth}
                  darkMode={darkMode}
                  FunctionContext={FunctionContext}
                />
              }
            />
            <Route path="/search" element={<Search />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/empresa/:empresa" element={<BusinessProfile />} />
            <Route
              path="/:name"
              element={
                <UserProfile
                  darkMode={darkMode}
                  FunctionContext={FunctionContext}
                />
              }
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notificaciones" element={<Notifications />} />
          </Routes>
        </AppProvider>
      </Router>
    </main>
  );
}

export default App;
