import { useState, useEffect } from "react";
import logoN from "../assets/NavLogo.png";
import proSet from "../assets/Image-40.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Search({ setAuth }) {
  const location = useLocation();
  const recentSearches = location.state ? location.state.searchValue : null;

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return <>hola</>;
}
