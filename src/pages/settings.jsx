import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

export default function Settings() {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("settings");

  const [activeButtonCon, setActiveButtonCon] = useState("tucuen");

  const [darkMode, setDarkMode] = useState(() => {
    // Inicializa el estado a partir de LocalStorage o usa el valor predeterminado (false)
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const [divsVisibility, setDivsVisibility] = useState({
    tucuen: true,
    seguridad: false,
    privacidad: false,
    notificaciones: false,
    accesibilidad: false,
  });

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

  useEffect(() => {
    // Actualiza LocalStorage cuando cambia el estado
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="lg:w-[50%] w-full bg-[#EEEFEF] lg:px-0 p-1">
      <div className="bg-[#FFF] p-4">
        <p
          className={`text-xl font-bold leading-[18.62px] ${
            darkMode ? "dark-text-white" : ""
          }`}
        >
          Configuración
        </p>
        <div className="flex">
          <div className="w-[50%]">
            <div
              className={`margin-top mt-3 ${
                darkMode ? "dark-text-white" : ""
              } sidebarcontain`}
            >
              <button
                className={
                  activeButtonCon === "tucuen"
                    ? darkMode
                      ? "active-buttonH font-bold"
                      : "active-buttonD font-bold"
                    : ""
                }
                onClick={() => {
                  setActiveButtonCon("tucuen");
                }}
              >
                <p className="ml-4 p-txt">
                  Tu cuenta
                  <i class="ml-[200px] mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
            <div
              className={`margin-top mt-3 ${
                darkMode ? "dark-text-white" : ""
              } sidebarcontain`}
            >
              <button
                className={
                  activeButtonCon === "seguridad"
                    ? darkMode
                      ? "active-buttonH font-bold"
                      : "active-buttonD font-bold"
                    : ""
                }
                onClick={() => {
                  setActiveButtonCon("seguridad");
                }}
              >
                <p className="ml-4 p-txt">
                  Seguridad y acceso a la cuenta
                  <i class="ml-8 mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
            <div
              className={`margin-top mt-3 ${
                darkMode ? "dark-text-white" : ""
              } sidebarcontain`}
            >
              <button
                className={
                  activeButtonCon === "privacidad"
                    ? darkMode
                      ? "active-buttonH font-bold"
                      : "active-buttonD font-bold"
                    : ""
                }
                onClick={() => {
                  setActiveButtonCon("privacidad");
                }}
              >
                <p className="ml-4 p-txt">
                  Privacidad y seguridad
                  <i class="ml-[97px] mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
            <div
              className={`margin-top mt-3 ${
                darkMode ? "dark-text-white" : ""
              } sidebarcontain`}
            >
              <button
                className={
                  activeButtonCon === "notificaciones"
                    ? darkMode
                      ? "active-buttonH font-bold"
                      : "active-buttonD font-bold"
                    : ""
                }
                onClick={() => {
                  setActiveButtonCon("notificaciones");
                }}
              >
                <p className="ml-4 p-txt">
                  Notificaciones
                  <i class="ml-[165px] mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
            <div
              className={`margin-top mt-3 ${
                darkMode ? "dark-text-white" : ""
              } sidebarcontain`}
            >
              <button
                className={
                  activeButtonCon === "acceses"
                    ? darkMode
                      ? "active-buttonH font-bold"
                      : "active-buttonD font-bold"
                    : ""
                }
                onClick={() => {
                  setActiveButtonCon("acceses");
                }}
              >
                <p className="ml-4 p-txt">
                  Accesibilidad, pantalla e idiomas
                  <i class="ml-4 mt-1 fa-solid fa-chevron-right"></i>
                </p>
              </button>
            </div>
          </div>
          <div className="w-[50%]">
            {activeButtonCon === "tucuen" && (
              <div className="w-[100%]">
                <p
                  className={`text-xl font-bold leading-[18.62px] ${
                    darkMode ? "dark-text-white" : ""
                  }`}
                >
                  Tu cuenta
                </p>
                <p
                  className={`mt-4 w-[80%] text-[14px] font-medium leading-[10.71px] ${
                    darkMode ? "dark-text-white" : ""
                  }`}
                >
                  Ve la información de la cuenta, descarga un archivo con tus
                  datos u obtén más información acerca de las opciones de
                  desactivación de la cuenta
                </p>
                <div
                  className={`w-[100%] margin-top mt-3 ${
                    darkMode ? "dark-text-white" : ""
                  } sidebarcontain`}
                >
                  <button
                    className={
                      activeButtonCon === "seguridad"
                        ? darkMode
                          ? "active-buttonH font-bold"
                          : "active-buttonD font-bold"
                        : ""
                    }
                  >
                    <p className="p-txt">
                      Información de la cuenta
                      <i class="ml-8 mt-1 fa-solid fa-chevron-right"></i>
                    </p>
                  </button>
                </div>
                <div
                  className={`w-[100%] margin-top mt-3 ${
                    darkMode ? "dark-text-white" : ""
                  } sidebarcontain`}
                >
                  <button
                    className={
                      activeButtonCon === "seguridad"
                        ? darkMode
                          ? "active-buttonH font-bold"
                          : "active-buttonD font-bold"
                        : ""
                    }
                  >
                    <p className="mr-[22%]">
                      Cambia tu contraseña
                      <i class="ml-8 mt-1 fa-solid fa-chevron-right"></i>
                    </p>
                    <p className="ml-1 text-[12px] font-medium leading-[10.71px]">
                      Cambia tu contraseña en cualquier momento.
                    </p>
                  </button>
                </div>
                <div
                  className={`w-[100%] margin-top mt-3 ${
                    darkMode ? "dark-text-white" : ""
                  } sidebarcontain`}
                >
                  <button
                    className={
                      activeButtonCon === "seguridad"
                        ? darkMode
                          ? "active-buttonH font-bold"
                          : "active-buttonD font-bold"
                        : ""
                    }
                  >
                    <p className="mr-[28%] p-txt">
                      Elimina tu cuenta
                      <i class="ml-8 mt-1 fa-solid fa-chevron-right"></i>
                    </p>
                    <p className="ml-1 text-[12px] font-medium leading-[10.71px]">
                      Averigua cómo puedes eliminar tu cuenta
                    </p>
                  </button>
                </div>
              </div>
            )}
            {activeButtonCon === "seguridad" && (
              <div>
                <p
                  className={`text-xl font-bold leading-[18.62px] ${
                    darkMode ? "dark-text-white" : ""
                  }`}
                >
                  Seguridad
                </p>
              </div>
            )}
            {activeButtonCon === "privacidad" && (
              <div>
                <p
                  className={`text-xl font-bold leading-[18.62px] ${
                    darkMode ? "dark-text-white" : ""
                  }`}
                >
                  Privacidad
                </p>
                <p className="mt-3">
                  D.R.© ANCER 2023, S.A.P.I. DE C.V., México 2023. Utilización
                  del sitio únicamente bajo términos legales. Whistleblowwer®
                  Pedro Infante # 1000, Colonia Cumbres Oro Regency, Monterrey,
                  Nuevo León. México. 64347.
                </p>
                <a
                  href="https://drive.google.com/file/d/1KSHo59H6wGwYe4Rh3hxezVvRjNyZgwVI/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-500 font-bold"
                >
                  Terminos y condiciones
                </a>
              </div>
            )}
            {activeButtonCon === "notificaciones" && (
              <div>
                <p
                  className={`text-xl font-bold leading-[18.62px] ${
                    darkMode ? "dark-text-white" : ""
                  }`}
                >
                  Notificaciones
                </p>
              </div>
            )}
            {activeButtonCon === "acceses" && (
              <div>
                <p
                  className={`text-xl font-bold leading-[18.62px] ${
                    darkMode ? "dark-text-white" : ""
                  }`}
                >
                  Accesibilidad
                </p>
                <div className="mt-3 margin-top">
                  <button className="toggle-dark-mode" onClick={toggleDarkMode}>
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
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
