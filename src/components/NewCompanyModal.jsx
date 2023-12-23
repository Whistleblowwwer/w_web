import React, { useState, useEffect, useRef } from "react";
import countriesList from "../utils/countries.json";

function NewCompanyModal(props) {

  // variables country
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [iso2Country, setIso2Country] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countriesList);
  const [isListVisible, setIsListVisible] = useState(false);

  //variables state
  const [stateList, setStateList] = useState([]);
  const [stateSearch, setStateSearch] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [iso2State, setIso2State] = useState("");
  const [isStateListVisible, setIsStateListVisible] = useState(false);
  const [filteredStates, setFilteredStates] = useState(stateList);

  //variables city
  const [cityList, setCityList] = useState([]);
  const [citySearch, setCitySearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isCityListVisible, setIsCityListVisible] = useState(false);
  const [filteredCity, setFilteredCity] = useState(cityList);

  const inputRef = useRef(null);

  useEffect(() => {
    setFilteredCountries(countriesList);
  }, []);

  const handleCountryChange = (e) => {
    const searchValue = e.target.value;
    setCountrySearch(searchValue);

    // Filtrar la lista de países según la búsqueda
    const filtered = countriesList.filter((country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCountries(filtered);
    setIsListVisible(true);
  };

  const handleStateChange = (e) => {
    const searchValue = e.target.value;
    setStateSearch(searchValue);
  
    // Filtrar la lista de estados según la búsqueda
    const filtered = stateList.filter((state) =>
      state.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredStates(filtered);
    setIsStateListVisible(true);
  };
  
  const handleCountrySelect = (name, iso2) => {
    setSelectedCountry(name);
    setCountrySearch(name);
    setIso2Country(iso2);
    setIsListVisible(false);

    props.handleCountrySelect(name, iso2);
  
    const apiUrl = `https://api.countrystatecity.in/v1/countries/${iso2}/states`;
  
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "NWlXQUJPZ2JmejVZY2NSODdTNXpBc3VxdWVxSTAydEpqU01tVENZaQ==");
  
    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };
  
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        setStateList(result);
        setFilteredStates(result); // Filtrar también la lista de estados inicialmente
      })
      .catch(error => console.log('error', error));
  };

  const handleStateSelect = (name, iso2) => {
    setSelectedState(name);
    setStateSearch(name);
    setIso2State(iso2);
    setIsStateListVisible(false);
    props.handleStateSelect(name, iso2);

    const apiUrl = `https://api.countrystatecity.in/v1/countries/${iso2Country}/states/${iso2}/cities`;

    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "NWlXQUJPZ2JmejVZY2NSODdTNXpBc3VxdWVxSTAydEpqU01tVENZaQ==");

    var requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow'
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json()) // Cambiado a .json() para obtener un objeto JSON
      .then(result => {
        setCityList(result);
        setFilteredCity(result);
      })
      .catch(error => console.log('error', error));
  };

  const handleCityChange = (e) => {
    const searchValue = e.target.value;
    setCitySearch(searchValue);
  
    // Filtrar la lista de estados según la búsqueda
    const filtered = cityList.filter((city) =>
      city.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCity(filtered);
    setIsCityListVisible(true);
  };

  const handleCitySelect = (name) => {
    setSelectedCity(name);
    setCitySearch(name);
    setIsCityListVisible(false);
    props.handleCitySelect(name);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsListVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleStateMenuClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsStateListVisible(false);
      }
    };

    document.addEventListener("click", handleStateMenuClickOutside);
    return () => {
      document.removeEventListener("click", handleStateMenuClickOutside);
    };
  }, [inputRef]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      <div
        className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] h-auto w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] modalres ${
          props.darkMode ? "dark-register-bg" : ""
        }`}
      >
        <div className="text-right">
          <button
            onClick={props.handleNewCompanyModal}
            className={`${
              props.darkMode ? "dark-text-white" : ""
            } hover:text-gray-500 cursor-pointer`}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form
          onSubmit={props.handleSubmit}
          className="max-w-md mx-auto mt-3 p-4 bg-white rounded"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 font-semibold mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={props.name}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {/* Agregué clases de tamaño a los contenedores de las etiquetas e inputs */}
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="address"
                className="block text-gray-600 font-semibold mb-2"
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={props.address}
                onChange={props.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="entity"
                className="block text-gray-600 font-semibold mb-2"
              >
                Entidad
              </label>
              <input
                type="text"
                id="entity"
                name="entity"
                value={props.entity}
                onChange={props.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full md:w-1/2 px-2" ref={inputRef}>
              <label
                htmlFor="country"
                className="block text-gray-600 font-semibold mb-2"
              >
                Pais
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={countrySearch}
                onChange={handleCountryChange}
                className="w-full p-2 border border-gray-300 rounded"
                onClick={() => setIsListVisible(true)}
              />
              {isListVisible && (
                <div className="relative">
                  <ul className="absolute z-10 w-full border border-gray-300 rounded mt-1 bg-white">
                    {filteredCountries.map((country) => (
                      <li
                        key={country.id}
                        onClick={() =>
                          handleCountrySelect(country.name, country.iso2)
                        }
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        {country.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2" ref={inputRef}>
              <label
                htmlFor="state"
                className="block text-gray-600 font-semibold mb-2"
              >
                Estado
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={stateSearch}
                onChange={handleStateChange}
                className="w-full p-2 border border-gray-300 rounded"
                onClick={() => setIsStateListVisible(true)}
              />
              {isStateListVisible && (
                <div className="relative">
                  <ul className="absolute z-10 w-full border border-gray-300 rounded mt-1 bg-white">
                    {filteredStates.map((state) => (
                      <li
                        key={state.id}
                        onClick={() =>
                          handleStateSelect(state.name, state.iso2)
                        }
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        {state.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="city"
                className="block text-gray-600 font-semibold mb-2"
              >
                Ciudad
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={citySearch}
                onChange={handleCityChange}
                className="w-full p-2 border border-gray-300 rounded"
                onClick={() => setIsCityListVisible(true)}
              />
              {isCityListVisible && (
                <div className="relative">
                  <ul className="absolute z-10 w-full border border-gray-300 rounded mt-1 bg-white">
                    {filteredCity.map((city) => (
                      <li
                        key={city.id}
                        onClick={() =>
                          handleCitySelect(city.name)
                        }
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        {city.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label
                htmlFor="category"
                className="block text-gray-600 font-semibold mb-2"
              >
                Categoria
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={props.category}
                onChange={props.handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={props.handleCreateBusiness}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCompanyModal;
