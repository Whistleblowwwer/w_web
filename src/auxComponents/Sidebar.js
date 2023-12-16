import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logoN from "../assets/NavLogo.png";
import proSet from "../assets/Image-40.png";
import { SIDEBAR_HOME_LINKS } from "../constants";

const Sidebar = ({ darkMode, handleUserClick, handlePostModal, username }) => {
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("home");
  return (
    <div className="w-[20%] bg-[#FFF] sticky top-0 h-screen lg:block hidden">
      <div className="p-6 w-full h-full flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <img
            src={logoN}
            alt="Logo"
            className="w-12 h-auto cursor-pointer"
            onClick={() => {
              setActiveButton("home");
              navigate("/home");
            }}
          />
          <ul className="flex flex-col gap-4 items-start">
            {SIDEBAR_HOME_LINKS.map((link) => (
              <button
                key={link.key}
                className={`w-full text-left ${
                  activeButton === link.label
                    ? darkMode
                      ? "active-buttonH font-bold"
                      : "active-buttonD font-bold"
                    : ""
                }`}
                onClick={() => {
                  setActiveButton(link.key);
                  navigate(link.href);
                }}
              >
                <p className="text-lg xl:text-xl">
                  <i className={`p-fa fa-solid ${link.icon} mr-3`} />
                  {link.label}
                </p>
              </button>
            ))}
          </ul>
          <button
            onClick={handlePostModal}
            className="rounded-[24px] h-[48px] w-[80%] button-style text-white font-bold"
          >
            Publicar
          </button>
        </div>
        <div className="w-full flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleUserClick}
          >
            <img src={proSet} alt="Imagen" className="w-10 h-10" />
            <p className={`text-xl ${darkMode ? "dark-text-white" : ""}`}>
              {username}
            </p>
          </div>
          <button>
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              className={`w-8 h-8 ${darkMode && "dark-text-white"}`}
            >
              <path d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
