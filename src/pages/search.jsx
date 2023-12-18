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

  return (
    <div className="w-[30%] bg-[#FFF] lg:block hidden p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-[22px] font-semibold mb-2">Filtros</h1>
        <div className="flex flex-col gap-2 p-2 rounded-lg border-2 border-[#EEEFEF]">
          <p className="font-bold">Personas</p>
          <div>
            <label className="flex justify-between">
              De cualquiera
              <input type="radio" name="peopleOptions" defaultChecked />
            </label>
            <label className="flex justify-between">
              Personas a las que sigues
              <input type="radio" name="peopleOptions" />
            </label>
          </div>
          <p className="font-bold">Ubicacion</p>
          <div>
            <label className="flex justify-between">
              En cualquier lugar
              <input type="radio" name="locationOptions" defaultChecked />
            </label>
            <label className="flex justify-between">
              Cerca de ti
              <input type="radio" name="locationOptions" />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-[#EEEFEF] ">
          <p className="font-bold">A quien seguir</p>

          {/* CONVERTIR EN COMPONENTE */}
          <div className="bg-white p-3 rounded-lg flex justify-between">
            <div className="flex gap-4 items-center">
              <img src={proSet} alt="Imagen" className="w-10 h-10" />
              <p className="text-sm">
                <span className="font-bold">Nickname</span>
                <br />
                <span className="text-gray-500">Fulll name</span>
              </p>
            </div>
            <button className="px-4 py-2 bg-[#EEEFEF] rounded-full">
              Seguir
            </button>
          </div>
          {/* CONVERTIR EN COMPONENTE */}

          <div className="bg-white p-3 rounded-lg flex justify-between">
            <div className="flex gap-4 items-center">
              <img src={proSet} alt="Imagen" className="w-10 h-10" />
              <p className="text-sm">
                <span className="font-bold">Nickname</span>
                <br />
                <span className="text-gray-500">Fulll name</span>
              </p>
            </div>
            <button className="px-4 py-2 bg-[#EEEFEF] rounded-full">
              Seguir
            </button>
          </div>
          <div className="bg-white p-3 rounded-lg flex justify-between">
            <div className="flex gap-4 items-center">
              <img src={proSet} alt="Imagen" className="w-10 h-10" />
              <p className="text-sm">
                <span className="font-bold">Nickname</span>
                <br />
                <span className="text-gray-500">Fulll name</span>
              </p>
            </div>
            <button className="px-4 py-2 bg-[#EEEFEF] rounded-full">
              Seguir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
