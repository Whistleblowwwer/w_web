import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logoN from "../assets/w_logo.svg";
import proSet from "../assets/defaultProfilePicture.webp";
import { SIDEBAR_HOME_LINKS } from "../constants";
import defaultPp from "../assets/defaultProfilePicture.webp";

const Sidebar = ({
  darkMode,
  handleUserClick,
  handleNewCompanyModal,
  user,
}) => {
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
                <div className="flex items-center">
                  <img src={link.icon} alt={link.label} className="mr-2" />
                  <p className="text-lg xl:text-xl">{link.label}</p>
                </div>
              </button>
            ))}
          </ul>
          {/* <button
            onClick={handlePostModal}
            className="rounded-[24px] h-[48px] w-[80%] button-style text-white font-bold"
          >
            Publicar
          </button> */}
        </div>
        <div className="w-full items-center">
          <div className="flex items-center justify-center p-9">
            <button
              className="py-2 px-4 mt-4 w-[180px] h-[41px] bg-slate-300	 rounded-[44px] relative mt-12 mr-2"
              onClick={handleNewCompanyModal}
            >
              <p className="font-extrabold text-violet-700 text-[15px] leading-[13.96px]">
                Crear empresa
              </p>
            </button>
          </div>
          <div className="flex justify-center text-gray-600">
            <a href="/t&c" target="_blank" rel="noopener noreferrer">
              Terminos y condiciones
            </a>
          </div>
          <div className="flex justify-center text-gray-600 mb-6">
            <a
              href="/aviso-privacidad"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aviso de privacidad
            </a>
          </div>

          <div className="flex justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleUserClick}
            >
              <img
                src={
                  user?.profile_picture_url
                    ? user?.profile_picture_url
                    : defaultPp
                }
                alt="Imagen"
                className="w-10 h-10"
              />
              <div className="flex flex-col">
                <p className={`text-xl ${darkMode ? "dark-text-white" : ""}`}>
                  {user?.name}
                </p>
                <p className="text-neutral-400 text-sm font-light">
                  {user?.nick_name}
                </p>
              </div>
            </div>
            <button onClick={() => navigate("/settings")}>
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
    </div>
  );
};

export default Sidebar;
