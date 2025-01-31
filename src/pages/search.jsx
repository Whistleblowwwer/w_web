import { useState, useEffect } from "react";
import logoN from "../assets/NavLogo.png";
import proSet from "../assets/defaultProfilePicture.webp";
import { useNavigate, useLocation } from "react-router-dom";
import { getHeadersBase } from "../utils/getHeaders";
import defaultPp from "../assets/defaultProfilePicture.webp";
import layer1 from "../assets/Andrés Orozco.jpg";
import layer2 from "../assets/Victor Barrios.jpg";
import layer3 from "../assets/Yelile Marcos.jpg";
import header from "../assets/broker_header.svg";
import Slider from "../components/Slider";
import bannerBroker1 from "../assets/banner_broker1.jpg";
import bannerBroker2 from "../assets/banner_broker2.jpg";
import bannerAbogado1 from "../assets/banner_abogado1.jpg";
import bannerAbogado2 from "../assets/banner_abogado2.jpg";

export default function Search({ setAuth }) {
  const location = useLocation();
  const recentSearches = location.state ? location.state.searchValue : null;

  const [selectedTab, setSelectedTab] = useState("asesores"); // Puedes inicializarlo con el valor por defecto deseado
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [isBusinessVisible, setIsBusinessVisible] = useState(false);
  const [isPeopleVisible, setIsPeopleVisible] = useState(false);

  console.log([bannerBroker1, bannerBroker2]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setIsSearchVisible(true);
  };

  const handleVisibleBusiness = () => {
    setIsBusinessVisible(true);
    setIsPeopleVisible(false);
  };

  const handleVisiblePeople = () => {
    setIsBusinessVisible(false);
    setIsPeopleVisible(true);
  };

  const handleCloseSearch = () => {
    setIsBusinessVisible(false);
    setIsPeopleVisible(false);
    setIsSearchVisible(false);
  };

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  const [recommendedUsers, setRecommendedUsers] = useState([]);

  const headersBase = getHeadersBase();

  useEffect(() => {
    async function getRecommendedUsers() {
      try {
        headersBase.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: headersBase,
        };
        const response = await fetch(
          "https://api.whistleblowwer.net/users/recommendation",
          requestOptions
        );
        const res = await response.json();
        setRecommendedUsers(res.users);
      } catch (error) {
        console.log(error);
      }
    }
    getRecommendedUsers();
  }, []);

  return (
    <div className="w-[30%] bg-[#FFF] lg:block hidden p-4">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-[22px] font-semibold mb-2">Buscar</h1>
        <div className="mt-3">
          <div className="w-full">
            <div className="flex gap-4">
              <button
                className={`${
                  selectedTab === "asesores" ? "active-asesores" : ""
                } flex-grow mr-2 mb-2 `}
                onClick={() => {
                  handleTabClick("asesores");
                  handleVisibleBusiness();
                }}
              >
                <p
                  className={`${
                    selectedTab === "asesores"
                      ? "font-bold"
                      : "font-bold text-opacity-60"
                  } mb-2`}
                >
                  Asesores
                </p>
                {selectedTab === "asesores" && (
                  <div className="tab-indicator" />
                )}
              </button>
              {/* Añade una pestaña para abogados */}
              <button
                className={`${
                  selectedTab === "abogados" ? "active-abogados" : ""
                } flex-grow mr-2 mb-2 `}
                onClick={() => {
                  handleTabClick("abogados");
                  handleVisiblePeople();
                }}
              >
                <p
                  className={`${
                    selectedTab === "abogados"
                      ? "font-bold"
                      : "font-bold text-opacity-60"
                  } mb-2`}
                >
                  Abogados
                </p>
                {selectedTab === "abogados" && (
                  <div className="tab-indicator" />
                )}
              </button>
            </div>
          </div>
        </div>
        {selectedTab == "asesores" && (
          <div className="flex flex-col">
            <Slider images={[bannerBroker1, bannerBroker2]} />
            <img className="pb-3" src={layer1} alt="banner" />
            <img className="pb-3" src={layer2} alt="banner" />
            <img src={layer3} alt="banner" />
          </div>
        )}
        {selectedTab == "abogados" && (
          <div className="w-full h-full flex justify-between items-center">
            <Slider images={[bannerAbogado1, bannerAbogado2]} />
          </div>
        )}
        {/* <div className="flex flex-col gap-2 p-4 rounded-lg bg-[#EEEFEF]">
          <p className="font-bold">A quien seguir</p>
          <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto ">
            {recommendedUsers.map((user) => (
              <div
                key={user._id_user}
                className="bg-white p-3 rounded-lg flex xl:flex-row flex-col justify-between"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={
                      user.profile_picture_url
                        ? user.profile_picture_url
                        : defaultPp
                    }
                    alt="Imagen"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="text-sm">
                    <span className="font-bold">{user.nick_name}</span>
                    <br />
                    <span className="text-gray-500">
                      {user.name} {user.last_name}
                    </span>
                  </p>
                </div>
                <button className="px-4 py-2 bg-[#EEEFEF] rounded-full">
                  Seguir
                </button>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
