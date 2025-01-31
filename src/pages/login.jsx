import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import google from "../assets/Group 3.svg";
import { useNavigate, useLocation } from "react-router-dom";
import logoN from "../assets/w_logo.svg";
import LogoNuevo from '../assets/LogoNuevo.png';
import imagenDeFondoCompleto from '../assets/FondoCompletoCelular-removebg-preview.png';
import imagenFondoCelular from '../assets/CelularCompletoFondo-removebg-preview.png';
import '../styles/querys.css';

export default function Login({ setAuth }) {
  const location = useLocation();
  const darkMode = location.state?.darkMode || false;

  useEffect(() => {
    localStorage.setItem("pageReloaded", "false");
  });

  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(fontLink);
    };
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = (url) => {
    navigate(url, { state: { darkMode } });
  };

  const [inputs, setInputs] = useState({
    client_email: "",
    client_password: "",
  });

  const { client_email, client_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { client_email, client_password };
      const response = await fetch(
        "https://api.whistleblowwer.net/users/login",
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("client_email", client_email);
        localStorage.setItem("client_password", client_password);
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("¡Inicio de sesión exitoso!");
      } else {
        setAuth(false);
        toast.error("Credenciales inválidas. Por favor, inténtelo de nuevo.");
      }
    } catch (err) {
      console.error(err.message);
      toast.error(
        "Ha ocurrido un error al iniciar sesión. Por favor, inténtelo de nuevo."
      );
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Execute your action here
      onSubmitForm();
    }
  };

  return (
    <div
      className={`overflow-y-hidden w-screen flex overflow-x-hidden items-center h-screen p-0 container-form ${
        darkMode ? "dark-register-bg" : ""
      }`}
    >
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="w-[50%] ocultar-response-login overflow-x-hidden"></div>
      <form className="py-1 response-form" onSubmit={onSubmitForm}>
        <div className={`bg-[#FBFCF8] flex items-center justify-center w-[100%] rounded-[20px] overflow-hidden`}>
          <div
            className={`w-[80%] response-login-form `}
          >
            <div className="flex justify-center items-center pt-8">
              <img
                src={logoN}
                alt="Logo"
                className="w-16 h-auto cursor-pointer"
                style={{ width: '5rem' }}
              />
              
            </div>
            <div className="flex items-center justify-center">
              <h1
                className={`text-neutral-900 text-[26px] font-bold leading-7 mt-4 ${
                  darkMode ? "dark-text-white" : ""
                }`}
                style={{ fontWeight: 700 }}
              >
                Inicia sesión
              </h1>
            </div>
            <div className="flex justify-center items-center mt-3">
              <input
                name="client_email"
                value={client_email}
                onChange={(e) => onChange(e)}
                placeholder="Correo electrónico"
                required
                className="placeholder-opacity-60 mr-4 mt-3 p-5 rounded-[8px] w-[87%] h-8 bg-white text-neutral-900 text-opacity-100 text-xs font-medium leading-[11.17px] border border-gray-200"
                style={{ fontSize: '14px' }} // Ajuste de padding aquí
              />
            </div>
            <div className="flex justify-center items-center">
              <input
                  type="password"
                  name="client_password"
                  value={client_password}
                  onChange={(e) => onChange(e)}
                  placeholder="Contraseña"
                  required
                  className={`placeholder-opacity-60 mr-4 mt-3 p-5 rounded-[8px] w-[87%] h-8 bg-white text-neutral-900 text-opacity-60 text-xs font-medium leading-[11.17px] border border-gray-200  ${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                      
                }` }
                style={{ fontSize: '14px' }}
              />
            </div>
            <div className="flex mt-2 ml-8">
              <p
                className={`text-zinc-900 text-[11px] font-medium leading-[20px] ${
                  darkMode ? "dark-text-white" : ""
                }`}
              >
                ¿Olvidaste tu contraseña?
              </p>
            </div>
            <div className="flex justify-center items-center mt-[30px]">
              <button
                type="submit"
                className={`hover:bg-gray-700 py-2 px-4 mt-4 w-[60%] h-[41px] bg-[#641F89] rounded-[8px] relative ${
                  darkMode ? "dark-button" : ""
                }`}
              >
                <span
                  className={`text-stone-50 text-[15px] font-bold leading-[13.96px] ${
                    darkMode ? "dark-text" : ""
                  }`}
                >
                  Ingresar
                </span>
              </button>
            </div>
            <div className="flex justify-center items-center mt-4 pb-8">
              <p
                className={`text-zinc-900 text-[11px] font-medium leading-[9.31px] ${
                  darkMode ? "dark-text-white" : ""
                }`}
              >
                <a
                  className="cursor-pointer"
                  onClick={() => handleButtonClick("/register")}
                >
                  Crea una cuenta nueva
                </a>
              </p>
            </div>
          
          </div>
          
        </div>
      </form>
      <img src={imagenFondoCelular} alt="Celular" className="fondo-celular-response" />
    </div>
  );
}
