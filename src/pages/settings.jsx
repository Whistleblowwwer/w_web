import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

export default function Settings() {
  const [activeButton, setActiveButton] = useState("settings");

  const [activeButtonCon, setActiveButtonCon] = useState("tucuen");

  const [divsVisibility, setDivsVisibility] = useState({
    tucuen: true,
    seguridad: false,
    privacidad: false,
    notificaciones: false,
    accesibilidad: false,
  });

  const handleCloseSesion = () => {
    localStorage.removeItem("client_password");
    localStorage.removeItem("recentSearches");
    localStorage.removeItem("client_email");
    localStorage.removeItem("token");
    localStorage.removeItem("validCredentials");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("pageReloaded");
    window.location.reload();

    // window.location.reload();
  };

  const handleButtonClick = (buttonName) => {
    setActiveButtonCon(buttonName);
    setDivsVisibility((prevVisibility) => {
      const updatedVisibility = { ...prevVisibility };
      for (const key in updatedVisibility) {
        updatedVisibility[key] = key === buttonName;
      }
      return updatedVisibility;
    });
  };

  return (
    <div className="lg:w-[50%] w-full bg-[#EEEFEF] lg:px-0 p-1">
      <div className="bg-[#FFF] p-4">
        <p className={`text-xl font-bold leading-[18.62px]`}>Configuración</p>
        <div className="flex">
          <div className="w-[50%]">
            <div className={`margin-top mt-3 sidebarcontain`}>
              <button
                className={
                  activeButtonCon === "tucuen" ? "active-buttonD font-bold" : ""
                }
                onClick={() => {
                  setActiveButtonCon("tucuen");
                }}
              >
                <p className="ml-4 p-txt">
                  Tu cuenta
                  <i className="ml-[200px] mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
            <div className={`margin-top mt-3 sidebarcontain`}>
              <button
                className={
                  activeButtonCon === "seguridad"
                    ? "active-buttonD font-bold"
                    : ""
                }
                onClick={() => {
                  setActiveButtonCon("seguridad");
                }}
              >
                <p className="ml-4 p-txt">
                  Seguridad y acceso a la cuenta
                  <i className="ml-8 mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
            <div className={`margin-top mt-3 sidebarcontain`}>
              <button
                className={
                  activeButtonCon === "privacidad"
                    ? "active-buttonD font-bold"
                    : ""
                }
                onClick={() => {
                  setActiveButtonCon("privacidad");
                }}
              >
                <p className="ml-4 p-txt">
                  Privacidad y seguridad
                  <i className="ml-[97px] mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
            <div className={`margin-top mt-3 sidebarcontain`}>
              <button
                className={
                  activeButtonCon === "notificaciones"
                    ? "active-buttonD font-bold"
                    : ""
                }
                onClick={() => {
                  setActiveButtonCon("notificaciones");
                }}
              >
                <p className="ml-4 p-txt">
                  Notificaciones
                  <i className="ml-[165px] mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
            <div className={`margin-top mt-3 sidebarcontain`}>
              <button
                className={
                  activeButtonCon === "acceses"
                    ? "active-buttonD font-bold"
                    : ""
                }
                onClick={() => {
                  setActiveButtonCon("acceses");
                }}
              >
                <p className="ml-4 p-txt">
                  Accesibilidad, pantalla e idiomas
                  <i className="ml-4 mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
          </div>
          <div className="w-[50%]">
            {activeButtonCon === "tucuen" && (
              <div className="w-[100%]">
                <p className={`text-xl font-bold leading-[18.62px]`}>
                  Tu cuenta
                </p>
                <button
                  className="hover:bg-gray-700 py-2 px-4 mt-4 w-[150px] h-[41px] bg-neutral-900 rounded-[44px] relative mt-12"
                  onClick={() => handleCloseSesion()}
                >
                  <span className="text-stone-50 text-[15px] font-medium leading-[13.96px]">
                    Cerrar sesión
                  </span>
                </button>
              </div>
            )}
            {activeButtonCon === "seguridad" && (
              <div>
                <p className={`text-xl font-bold leading-[18.62px]`}>
                  Seguridad
                </p>
              </div>
            )}
            {activeButtonCon === "privacidad" && (
              <div className="flex justify-center text-gray-600 mb-6 text-xs">
                <p>
                  D.R.© ANCER 2023, S.A.P.I. DE C.V., México 2023. Utilización
                  del sitio únicamente bajo
                  <u>
                    <a href="/t&c" target="_blank" rel="noopener noreferrer">
                      {" Términos Legales "}
                    </a>
                  </u>
                  Pedro Infante #1000, Colonia Cumbres Oro Regency, Monterrey,
                  Nuevo León, México. 64347.
                  <u>
                    <a
                      href="/avisoPrivacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" Aviso de Privacidad. "}
                    </a>
                  </u>
                </p>
              </div>
            )}
            {activeButtonCon === "notificaciones" && (
              <div>
                <p className={`text-xl font-bold leading-[18.62px]`}>
                  Notificaciones
                </p>
              </div>
            )}
            {activeButtonCon === "acceses" && (
              <div>
                <p className={`text-xl font-bold leading-[18.62px`}>
                  Accesibilidad
                </p>
                <div className="mt-3 margin-top">
                  {/* <button className="toggle-dark-mode" onClick={toggleDarkMode}>
                    {darkMode ? (
                      <>
                        <p className="text-white">
                          Desactivar Dark Mode{" "}
                          <i className="fa-solid fa-moon text-white"></i>
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-neutral-900">
                          Activar Dark Mode{" "}
                          <i className="fa-regular fa-moon"></i>
                        </p>
                      </>
                    )}
                  </button> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
