import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import google from "../assets/Group 3.svg";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login({ setAuth }) {
  const location = useLocation();
  const darkMode = location.state?.darkMode || false;

  useEffect(() => {
    localStorage.setItem("pageReloaded", "false");
  });

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
      console.log("login res", parseRes);

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

  return (
    <div
      className={`overflow-y-hidden w-screen flex justify-center items-center h-screen ${
        darkMode ? "dark-register-bg" : ""
      }`}
    >
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <form className="py-1" onSubmit={onSubmitForm}>
        <div
          className={`w-screen flex justify-center items-center h-screen ${
            darkMode ? "dark-register-bg" : ""
          }`}
        >
          <div
            className={`w-[438px] h-[504px] bg-[#FBFCF8] rounded-[10px] ${
              darkMode ? "dark-register" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <h1
                className={`text-neutral-900 text-3xl font-semibold leading-7 mt-8 ml-8 ${
                  darkMode ? "dark-text-white" : ""
                }`}
              >
                Inicia sesión
              </h1>
              <button
                onClick={() => handleButtonClick("/register")}
                className={`mr-4 mb-3 ${darkMode ? "dark-text-white" : ""}`}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex justify-center items-center mt-7">
              <button
                className={`hover:bg-gray-700 py-2 px-4 mt-4 w-[280px] h-[41px] bg-neutral-900 rounded-[44px] relative ${
                  darkMode ? "dark-button" : ""
                }`}
              >
                <img
                  src={google}
                  alt="google"
                  className="w-4.5 h-4.5 mr-2 absolute left-10 top-1/2 transform -translate-y-1/2"
                />
                <span
                  className={`text-stone-50 text-[15px] font-medium leading-[13.96px] pl-6 ${
                    darkMode ? "dark-text" : ""
                  }`}
                >
                  Iniciar sesión con Google
                </span>
              </button>
            </div>
            <div className="flex justify-center items-center mt-6">
              <input
                name="client_email"
                value={client_email}
                onChange={(e) => onChange(e)}
                placeholder="Teléfono o Correo electrónico"
                className={`placeholder-black mr-4 mt-4 p-2  rounded-[10px] w-[87%] h-8 bg-stone-50 text-neutral-900 text-opacity-60 text-xs font-medium leading-[11.17px] ${
                  darkMode ? "dark-register-bt placeholder-black-dk" : ""
                }`}
              />
            </div>
            <div className="flex justify-center items-center">
              <input
                type="password"
                name="client_password"
                value={client_password}
                onChange={(e) => onChange(e)}
                placeholder="Contraseña"
                className={`placeholder-black mr-4 mt-4 p-2 rounded-[10px] w-[87%] h-8 bg-stone-50 text-neutral-900 text-opacity-60 text-xs font-medium leading-[11.17px] ${
                  darkMode ? "dark-register-bt placeholder-black-dk" : ""
                }`}
              />
            </div>
            <div className="flex mt-2 ml-5">
              <p
                className={`text-zinc-900 text-[10px] font-medium leading-[9.31px] ${
                  darkMode ? "dark-text-white" : ""
                }`}
              >
                ¿Olvidaste tu contraseña?
              </p>
            </div>
            <div className="flex justify-center items-center mt-[120px]">
              <button
                type="submit"
                className={`hover:bg-gray-700 py-2 px-4 mt-4 w-[280px] h-[41px] bg-neutral-900 rounded-[44px] relative ${
                  darkMode ? "dark-button" : ""
                }`}
              >
                <span
                  className={`text-stone-50 text-[15px] font-medium leading-[13.96px] ${
                    darkMode ? "dark-text" : ""
                  }`}
                >
                  Iniciar sesión
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
