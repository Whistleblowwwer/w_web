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

import Tyc from "./pages/tyc";
import AvisoPrivavidad from "./pages/avisoPrivacidad";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AppProvider from "./providers/AppProvider";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const FunctionContext = createContext();

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    let token = ""
    try {
      // const body = {
      //   client_email: localStorage.client_email,
      //   client_password: localStorage.client_password,
      // };

      // const response = await fetch(
      //   "https://api.whistleblowwer.net/users/login",
      //   {
      //     method: "POST",
      //     mode: "cors",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(body),
      //   }
      // );

      // const parseRes = await response.json();
      // token = parseRes.token

      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const response_token = await fetch(
        "https://api.whistleblowwer.net/users/token",
        requestOptions
      );

      if (response_token.status == 401) { setIsAuthenticated(false) }
      else {
        setIsAuthenticated(true)
      }
    } catch (err) {
      setIsAuthenticated(false)
      console.error(err.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  if (loading) {
    <div>
      loading...
    </div>
  }

  return (
    <main
      className={`bg-[#EEEFEF] w-full flex gap-1 pt-20 pb-14 lg:p-0 lg:pb-0`}
    >
      <Router>
        <AppProvider FunctionContext={FunctionContext} token={localStorage.token}>
          <Routes>
            <Route path="/" element={
              isAuthenticated ? (
                <Home
                  setAuth={setAuth}
                  FunctionContext={FunctionContext}
                />
              ) : (
                <Navigate to="/login" />
              )
            } />
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
                  FunctionContext={FunctionContext}
                />
              }
            />
            <Route path="/search" element={<Search />} />
            <Route path="/chats" element={<Chats />} />
            <Route
              path="/empresa/:empresa"
              element={
                <BusinessProfile
                  setAuth={setAuth}
                  FunctionContext={FunctionContext}
                />
              }
            />
            <Route
              path="/:name"
              element={
                <UserProfile
                  setAuth={setAuth}
                  FunctionContext={FunctionContext}
                />
              }
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/t&c" element={<Tyc />} />
            <Route path="/aviso-privacidad" element={<AvisoPrivavidad />} />
            <Route path="/notificaciones" element={<Notifications />} />
          </Routes>
        </AppProvider>
      </Router>
    </main>
  );
}

export default App;
