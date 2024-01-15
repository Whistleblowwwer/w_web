import React, { useState, useEffect, createContext } from "react";

import {
  Register,
  Login,
  Home,
  Search,
  Chats,
  BusinessProfile,
  UserProfile,
  Review,
  Settings,
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

console.log("token", localStorage.token)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const FunctionContext = createContext();

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
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

      if (response_token.status === 401) { setIsAuthenticated(false) }
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

  return (
    <main
      className={`bg-[#EEEFEF] w-full flex gap-1 pt-20 pb-14 lg:p-0 lg:pb-0`}
    >
      <Router>
        {!loading ? (<AppProvider FunctionContext={FunctionContext} token={localStorage.token}>
          <Routes>
            <Route path="/" element={
              (isAuthenticated && (localStorage.getItem("token") != null)) ? (
                <Home
                  setAuth={setAuth}
                  FunctionContext={FunctionContext}
                />
              ) : (
                <Navigate to="/login" />
              )
            } />
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
                (isAuthenticated && (localStorage.getItem("token") != null)) ? (
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
              path="/settings"
              element={
                localStorage.token ? (
                  <Settings />
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
            <Route path="/t&c" element={<Tyc />} />
            <Route path="/aviso-privacidad" element={<AvisoPrivavidad />} />
            <Route path="/notificaciones" element={<Notifications />} />
          </Routes>
        </AppProvider>) : (
          <div className="flex items-center justify-center h-screen w-screen">
            <div role="status" className="text-center">
              <svg
                aria-hidden="true"
                className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

      </Router>
    </main>
  );
}

export default App;
