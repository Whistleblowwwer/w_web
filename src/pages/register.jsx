import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { join } from "path-browserify";

export default function Register({ setAuth }) {
  const location = useLocation();
  const darkMode = location.state?.darkMode || false;

  useEffect(() => {
    // Agregar una clase al cuerpo al montar el componente
    document.body.classList.add("register-page");

    // Limpiar la clase al desmontar el componente para evitar fugas de memoria
    return () => {
      document.body.classList.remove("register-page");
    };
  }, []);

  const Navigate = useNavigate();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [step, setStep] = useState(1);
  const [tokenVerified, setTokenVerified] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    last_name: "",
    email: "",
    phone_number: "",
    birth_date: "",
    gender: "",
    password: "",
    role: "consumer",
  });

  const [otpCode, setOtpCode] = useState({
    number1: "",
    number2: "",
    number3: "",
    number4: "",
  });

  console.log(otpCode);

  const {
    name,
    username,
    last_name,
    email,
    phone_number,
    birth_date,
    gender,
    password,
    role,
  } = inputs;

  console.log(inputs);
  const handleOtpChange = (e, fieldName) => {
    const value = e.target.value;
    setOtpCode((prevOtpCode) => ({
      ...prevOtpCode,
      [fieldName]: value,
    }));
  };

  const validateMail = async (mail) => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const response = await fetch(
        `https://api.whistleblowwer.net/users/send-otp/?email=${mail}`,
        requestOptions
      );
      const parseRes = await response.json();
      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const validateOtpCode = async () => {
    try {
      const joinedCode =
        otpCode.number1 + otpCode.number2 + otpCode.number3 + otpCode.number4;
      console.log("otp code", joinedCode);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({
          code: Number(joinedCode),
          email: email,
        }),
      };

      const response = await fetch(
        "https://api.whistleblowwer.net/users/validate-otp/",
        requestOptions
      );

      const parseRes = await response.json();
      if (response.status == 200 || response.status == 201) {
        setTokenVerified(true);
        setStep(step + 1);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("step", step);

    if (step == 1) {
      setStep(step + 1);
      validateMail(email);
    }
    if (step == 2) {
      validateOtpCode();
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();

    setStep(step - 1);
  };

  const onChangeDay = (e) => {
    const selectedDay = e.target.value;
    setSelectedDay(selectedDay);
    const fullDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    setInputs({ ...inputs, birth_date: fullDate });
  };

  const onChangeMonth = (e) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
    const fullDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    setInputs({ ...inputs, birth_date: fullDate });
  };

  const onChangeYear = (e) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);
    const fullDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    setInputs({ ...inputs, birth_date: fullDate });
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onGenderChange = (e) => {
    setInputs({ ...inputs, gender: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name,
        last_name,
        email,
        phone_number,
        birth_date,
        gender,
        password,
        role,
      };
      const response = await fetch("https://api.whistleblowwer.net/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      console.log("res register", parseRes);
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(false);
        Navigate("/login");
        toast.success("¡Registro exitoso!");
      } else {
        toast.error(parseRes.message);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error(
        "Ha ocurrido un error al registrar. Por favor, inténtelo de nuevo."
      );
    }
  };

  return (
    <div>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div
        className={`flex justify-center items-center h-screen w-screen ${
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
              Crea tu cuenta
            </h1>
            <button
              className={`mr-4 mb-3 ${darkMode ? "dark-text-white" : ""}`}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form onSubmit={onSubmitForm}>
            {step == 1 && (
              <>
                <div className="flex mt-5 ml-5">
                  <p
                    className={`text-zinc-900 text-[10px] font-medium leading-[9.31px] ${
                      darkMode ? "dark-text-white" : ""
                    }`}
                  >
                    Username
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    name="username"
                    placeholder="Username"
                    className={`mr-4 mt-2 p-2  rounded-[10px] w-[87%] h-8 bg-stone-200 text-neutral-900 text-opacity-100 text-xs font-medium leading-[11.17px]${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                    }`}
                    value={username}
                    onChange={(e) => onChange(e)}
                  ></input>
                </div>
                <div className="flex mt-5 ml-5">
                  <p
                    className={`text-zinc-900 text-[10px] font-medium leading-[9.31px] ${
                      darkMode ? "dark-text-white" : ""
                    }`}
                  >
                    Nombre
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    name="name"
                    placeholder="Nombre"
                    className={`mr-4 mt-2 p-2  rounded-[10px] w-[87%] h-8 bg-stone-200 text-neutral-900 text-opacity-100 text-xs font-medium leading-[11.17px]${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                    }`}
                    value={name}
                    onChange={(e) => onChange(e)}
                  ></input>
                </div>
                <div className="flex mt-5 ml-5">
                  <p
                    className={`text-zinc-900 text-[10px] font-medium leading-[9.31px] ${
                      darkMode ? "dark-text-white" : ""
                    }`}
                  >
                    Apellidos
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    name="last_name"
                    placeholder="Apellido"
                    className={`mr-4 mt-2 p-2  rounded-[10px] w-[87%] h-8 bg-stone-200 text-neutral-900 text-opacity-100 text-xs font-medium leading-[11.17px]${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                    }`}
                    value={last_name}
                    onChange={(e) => onChange(e)}
                  ></input>
                </div>
                <div className="flex mt-5 ml-5">
                  <p
                    className={`text-zinc-900 text-[10px] font-medium leading-[9.31px] ${
                      darkMode ? "dark-text-white" : ""
                    }`}
                  >
                    Correo electrónico
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    name="email"
                    placeholder="Correo electrónico"
                    className={`mr-4 mt-2 p-2  rounded-[10px] w-[87%] h-8 bg-stone-200 text-neutral-1000 text-opacity-100 text-xs font-medium leading-[11.17px] ${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                    }`}
                    value={email}
                    onChange={(e) => onChange(e)}
                  ></input>
                </div>
              </>
            )}
            {step == 2 && (
              <>
                <div className="flex flex-col">
                  <div className="text-neutral-900 text-lg font-semibold leading-7 mt-8 ml-8 mb-8">
                    <p>Verifica tu codigo:</p>
                  </div>
                  <div className="partitioned flex justify-center items-center">
                    <input
                      type="text"
                      maxLength="1"
                      value={otpCode.number1}
                      onChange={(e) => handleOtpChange(e, "number1")}
                    />
                    <input
                      type="text"
                      maxLength="1"
                      value={otpCode.number2}
                      onChange={(e) => handleOtpChange(e, "number2")}
                    />
                    <input
                      type="text"
                      maxLength="1"
                      value={otpCode.number3}
                      onChange={(e) => handleOtpChange(e, "number3")}
                    />
                    <input
                      type="text"
                      maxLength="1"
                      value={otpCode.number4}
                      onChange={(e) => handleOtpChange(e, "number4")}
                    />
                  </div>
                </div>
              </>
            )}
            {step == 3 && (
              <>
                <div className="flex mt-5 ml-5">
                  <p
                    className={`text-zinc-900 text-[10px] font-medium leading-[9.31px] ${
                      darkMode ? "dark-text-white" : ""
                    }`}
                  >
                    Contraseña
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className={`mr-4 mt-2 p-2  rounded-[10px] w-[87%] h-8 bg-stone-200 text-neutral-900 text-opacity-100 text-xs font-medium leading-[11.17px] ${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                    }`}
                    value={password}
                    onChange={(e) => onChange(e)}
                  ></input>
                </div>
                <div className="flex mt-5 ml-5">
                  <p
                    className={`text-zinc-900 text-[10px] font-medium leading-[9.31px] ${
                      darkMode ? "dark-text-white" : ""
                    }`}
                  >
                    Telefono
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    name="phone_number"
                    placeholder="Telefono"
                    className={`mr-4 mt-2 p-2  rounded-[10px] w-[87%] h-8 bg-stone-200 text-neutral-900 text-opacity-100 text-xs font-medium leading-[11.17px] ${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                    }`}
                    value={phone_number}
                    onChange={(e) => onChange(e)}
                  ></input>
                </div>
                <div className="flex mt-5 mb-2 ml-5">
                  <p
                    className={`text-zinc-900 text-[10px] font-medium leading-[9.31px] ${
                      darkMode ? "dark-text-white" : ""
                    }`}
                  >
                    Cumpleaños
                  </p>
                </div>
                <div className="flex justify-center items-center mt-2 text-neutral-900 text-opacity-100 text-xs font-semibold leading-[11.17px] mr-4 mt-[3px]">
                  <div className="mr-3">
                    <select
                      className={`w-[119px] h-8 bg-stone-200 rounded-[10px] ${
                        darkMode ? "dark-register-bt placeholder-black-dk" : ""
                      }`}
                      name="month"
                      value={selectedMonth}
                      onChange={onChangeMonth}
                    >
                      <option value="nuM">Mes</option>
                      <option value="01">Enero</option>
                      <option value="02">Febrero</option>
                      <option value="03">Marzo</option>
                      <option value="04">Abril</option>
                      <option value="05">Mayo</option>
                      <option value="06">Junio</option>
                      <option value="07">Julio</option>
                      <option value="08">Agosto</option>
                      <option value="09">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                  </div>
                  <div className="mr-3">
                    <select
                      className={`w-[119px] h-8 bg-stone-200 rounded-[10px] ${
                        darkMode ? "dark-register-bt placeholder-black-dk" : ""
                      }`}
                      name="day"
                      value={selectedDay}
                      onChange={onChangeDay}
                    >
                      <option value="nuD">Día</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>
                  </div>
                  <div>
                    <select
                      className={`w-[119px] h-8 bg-stone-200 rounded-[10px] ${
                        darkMode ? "dark-register-bt placeholder-black-dk" : ""
                      }`}
                      name="year"
                      value={selectedYear}
                      onChange={onChangeYear}
                    >
                      <option value="nuA">Año</option>
                      <option value="1923">1923</option>
                      <option value="1924">1924</option>
                      <option value="1925">1925</option>
                      <option value="1926">1926</option>
                      <option value="1927">1927</option>
                      <option value="1928">1928</option>
                      <option value="1929">1929</option>
                      <option value="1930">1930</option>
                      <option value="1931">1931</option>
                      <option value="1932">1932</option>
                      <option value="1933">1933</option>
                      <option value="1934">1934</option>
                      <option value="1935">1935</option>
                      <option value="1936">1936</option>
                      <option value="1937">1937</option>
                      <option value="1938">1938</option>
                      <option value="1939">1939</option>
                      <option value="1940">1940</option>
                      <option value="1941">1941</option>
                      <option value="1942">1942</option>
                      <option value="1943">1943</option>
                      <option value="1944">1944</option>
                      <option value="1945">1945</option>
                      <option value="1946">1946</option>
                      <option value="1947">1947</option>
                      <option value="1948">1948</option>
                      <option value="1949">1949</option>
                      <option value="1950">1950</option>
                      <option value="1951">1951</option>
                      <option value="1952">1952</option>
                      <option value="1953">1953</option>
                      <option value="1954">1954</option>
                      <option value="1955">1955</option>
                      <option value="1956">1956</option>
                      <option value="1957">1957</option>
                      <option value="1958">1958</option>
                      <option value="1959">1959</option>
                      <option value="1960">1960</option>
                      <option value="1961">1961</option>
                      <option value="1962">1962</option>
                      <option value="1963">1963</option>
                      <option value="1964">1964</option>
                      <option value="1965">1965</option>
                      <option value="1966">1966</option>
                      <option value="1967">1967</option>
                      <option value="1968">1968</option>
                      <option value="1969">1969</option>
                      <option value="1970">1970</option>
                      <option value="1971">1971</option>
                      <option value="1972">1972</option>
                      <option value="1973">1973</option>
                      <option value="1974">1974</option>
                      <option value="1975">1975</option>
                      <option value="1976">1976</option>
                      <option value="1977">1977</option>
                      <option value="1978">1978</option>
                      <option value="1979">1979</option>
                      <option value="1980">1980</option>
                      <option value="1981">1981</option>
                      <option value="1982">1982</option>
                      <option value="1983">1983</option>
                      <option value="1984">1984</option>
                      <option value="1985">1985</option>
                      <option value="1986">1986</option>
                      <option value="1987">1987</option>
                      <option value="1988">1988</option>
                      <option value="1989">1989</option>
                      <option value="1990">1990</option>
                      <option value="1991">1991</option>
                      <option value="1992">1992</option>
                      <option value="1993">1993</option>
                      <option value="1994">1994</option>
                      <option value="1995">1995</option>
                      <option value="1996">1996</option>
                      <option value="1997">1997</option>
                      <option value="1998">1998</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                      <option value="2014">2014</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>
                <div className="flex mt-5 ml-5">
                  <p
                    className={`text-zinc-900 mt-2 text-[10px] font-medium leading-[9.31px] ${
                      darkMode ? "dark-text-white" : ""
                    }`}
                  >
                    Género
                  </p>
                </div>
                <div className="flex justify-center items-center mt-5 text-neutral-900 text-opacity-100 text-xs font-semibold leading-[11.17px] mr-1 mt-[3px]">
                  <div
                    className={`w-[120px] h-8 bg-stone-200 rounded-[10px] mr-3 flex justify-around items-center ${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                    }`}
                  >
                    <label className="mr-10">Hombre</label>
                    <input
                      type="radio"
                      value="M"
                      name="gender"
                      checked={inputs.gender === "M"}
                      onChange={onGenderChange}
                    ></input>
                  </div>
                  <div
                    className={`w-[120px] h-8 bg-stone-200 rounded-[10px] mr-3 flex justify-around items-center ${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                    }`}
                  >
                    <label className="mr-10">Mujer</label>
                    <input
                      type="radio"
                      value="F"
                      name="gender"
                      checked={inputs.gender === "F"}
                      onChange={onGenderChange}
                    ></input>
                  </div>
                  <div
                    className={`w-[120px] h-8 bg-stone-200 rounded-[10px] mr-3 flex justify-around items-center ${
                      darkMode ? "dark-register-bt placeholder-black-dk" : ""
                    }`}
                  >
                    <label className="mr-10">Custom</label>
                    <input
                      type="radio"
                      value="O"
                      name="gender"
                      checked={inputs.gender === "O"}
                      onChange={onGenderChange}
                    ></input>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    className="bg-purple-800 py-2 px-4 mt-4 w-[280px] h-[41px] bg-neutral-900 rounded-[44px] relative mt-12"
                    type="submit"
                  >
                    <span className="text-stone-50 text-[15px] font-medium leading-[13.96px]">
                      Crear cuenta
                    </span>
                  </button>
                </div>
              </>
            )}

            <div
              className={
                step == 3 || step == 1
                  ? "flex justify-center items-center"
                  : "flex justify-center items-center mt-24"
              }
            >
              {step != 1 && (
                <button
                  className="hover:bg-gray-700 py-2 px-4 mt-4 w-[180px] h-[41px] bg-neutral-900 rounded-[44px] relative mt-12 mr-2"
                  onClick={handlePrevious}
                >
                  <span className="text-stone-50 text-[15px] font-medium leading-[13.96px]">
                    {step == 2 ? "cambiar numero" : "atras"}
                  </span>
                </button>
              )}
              {step != 3 && (
                <button
                  className="hover:bg-gray-700 py-2 px-4 mt-4 w-[150px] h-[41px] bg-neutral-900 rounded-[44px] relative mt-12 ml-2"
                  onClick={handleNext}
                >
                  <span className="text-stone-50 text-[15px] font-medium leading-[13.96px]">
                    {step == 2 ? "valida codigo" : "siguiente"}
                  </span>
                </button>
              )}
            </div>
            <div className="flex justify-center items-center w-[100%] mt-10">
              <p
                className={`text-neutral-900 text-[10px] font-medium mt-4 ml-10 mr-[28px] translate-x-[-12px] ${
                  darkMode ? "dark-text-white" : ""
                }`}
              >
                Al registrarte, aceptas los{" "}
                <a href="/t&c" target="_blank" className="underline">
                  Términos de servicio
                </a>{" "}
                y la{" "}
                <a
                  href="aviso-privacidad"
                  target="_blank"
                  className="underline"
                >
                  Política de privacidad
                </a>{" "}
                , incluida la política de{" "}
                <a
                  href="aviso-privacidad"
                  target="_blank"
                  className="underline"
                >
                  Uso de Cookies
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
