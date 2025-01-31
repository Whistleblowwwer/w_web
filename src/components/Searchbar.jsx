import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import proSet from "../assets/defaultProfilePicture.webp";
import imgNoticias from "../assets/noticias_img.png";
import imgParaTi from "../assets/parati_img.png";
import imgLogoW from "../assets/w_logo.svg";
import Article from "../components/Article";
import Slider from "./Slider";
import BannerHow1 from "../assets/banner_how1.jpg";
import BannerHow2 from "../assets/banner_how2.jpg";
import BannerHow3 from "../assets/banner_how3.jpg";
import BannerHow4 from "../assets/banner_how4.jpg";
import BannerHow5 from "../assets/banner_how5.jpg";
import BannerNoticias1 from "../assets/banner_startup1.jpg";
import BannerNoticias2 from "../assets/banner_startup2.jpg";
import BannerTendencias1 from "../assets/banner_defraudados.jpg";
import BannerTendencias2 from "../assets/banner_defraudados2.jpg";

const Searchbar = ({
  darkMode,
  search,
  handleSearch,
  recentSearches,
  handleRecentSearch,
  businesses,
  handleBusinessClick,
  searchUser,
  handleUserClick,
  activeTabView,
  setActiveTabView,
  articles,
  FunctionContext,
}) => {
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState("empresas");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const [isBusinessVisible, setIsBusinessVisible] = useState(false);
  const [isPeopleVisible, setIsPeopleVisible] = useState(false);

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

  return (
    <div
      className={`${
        location.pathname === "/search"
          ? "lg:w-1/2 w-full"
          : "w-[30%] h-screen sticky top-0 lg:block hidden"
      } p-4 bg-[#FFF] `}
    >
      <div className="relative w-full">
        <h1 className="text-[22px] font-semibold mb-2">Buscar</h1>
        <span className="relative translate-y-[150%] left-0 pl-3 flex items-center">
          <i className="fas fa-search text-gray-700"></i>
        </span>
        {isSearchVisible ? (
          <input
            value={search}
            className="h-[35px] absolute bg-zinc-500 bg-opacity-10 rounded-lg pl-10 p-2 inline-flex w-full focus:outline-none"
            placeholder={`Buscar establecimiento`}
            onChange={(e) => handleSearch(e.target.value)}
            onClick={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              setIsSearchVisible(true);
            }}
          />
        ) : (
          <input
            value={search}
            className="h-[35px] absolute bg-zinc-500 bg-opacity-10 rounded-lg pl-10 p-2 inline-flex w-full focus:outline-none"
            placeholder={`Buscar establecimiento`}
            onChange={(e) => handleSearch(e.target.value)}
            onClick={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              setIsSearchVisible(true);
              setIsBusinessVisible(true);
            }}
          />
        )}
        <div className="overflow-y-auto mt-10">
          {isSearchVisible && (
            <div className="mt-4 w-full">
              <div className="flex gap-4">
                {/* ... Otras pestañas existentes */}
                <button
                  className={`${
                    selectedTab === "empresas" ? "active-empresas" : ""
                  } flex-grow mr-2 mb-2 `}
                  onClick={() => {
                    handleTabClick("empresas");
                    handleVisibleBusiness();
                  }}
                >
                  <p
                    className={`${
                      selectedTab === "empresas"
                        ? "font-bold"
                        : "font-bold text-opacity-60"
                    } mb-2`}
                  >
                    Empresas
                  </p>
                  {selectedTab === "empresas" && (
                    <div className="tab-indicator" />
                  )}
                </button>
                {/* Añade una pestaña para personas */}
                <button
                  className={`${
                    selectedTab === "personas" ? "active-personas" : ""
                  } flex-grow mr-2 mb-2 `}
                  onClick={() => {
                    handleTabClick("personas");
                    handleVisiblePeople();
                  }}
                >
                  <p
                    className={`${
                      selectedTab === "personas"
                        ? "font-bold"
                        : "font-bold text-opacity-60"
                    } mb-2`}
                  >
                    Personas
                  </p>
                  {selectedTab === "personas" && (
                    <div className="tab-indicator" />
                  )}
                </button>
                {/* Añade un botón para cerrar la búsqueda */}
                <button
                  className="flex-grow mr-2 mb-2"
                  onClick={handleCloseSearch}
                >
                  <i className="fas fa-times text-2xl"></i>
                </button>
              </div>
            </div>
          )}
          {/* <div>
            {recentSearches.map((term, index) => (
              <div
                key={index}
                className="flex cursor-pointer"
                onClick={() => handleRecentSearch(term)}
              >
                <p>{term}</p>
              </div>
            ))}
          </div>
          <div>
            {businesses.map((business) => (
              <div key={business._id_business}>
                <div
                  onClick={() => handleBusinessClick(business)}
                  className="flex cursor-pointer"
                >
                  <h2 className="mr-3">{business.name},</h2>
                  <p>{business.city}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            {searchUser.map((users) => (
              <div key={users._id_user}>
                <div
                  onClick={() => handleUserClick(users)}
                  className="flex cursor-pointer"
                >
                  <h2 className="mr-3">{users.name},</h2>
                  <p>{users.role}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      {!isSearchVisible && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 mt-4 w-full ">
            <button
              className={`${
                activeTabView === "parati"
                  ? darkMode
                    ? "active-parati"
                    : ""
                  : ""
              } flex-grow mr-0 mb-2`}
              onClick={() => setActiveTabView("parati")}
            >
              <p
                className={`${darkMode ? "dark-text-white" : ""} ${
                  activeTabView === "parati"
                    ? "font-bold"
                    : "font-bold text-opacity-60"
                } ml-0 mb-2`}
              >
                Para ti
              </p>
              {activeTabView === "parati" && <div className="tab-indicator" />}
            </button>
            <button
              className={`${
                activeTabView === "empresas"
                  ? darkMode
                    ? "active-empresas"
                    : ""
                  : ""
              } flex-grow mr-2 mb-2 `}
              onClick={() => {
                setActiveTabView("empresas");
                handleSearch("");
              }}
            >
              <p
                className={`${darkMode ? "dark-text-white" : ""} ${
                  activeTabView === "empresas"
                    ? "font-bold"
                    : "font-bold text-opacity-60"
                } mb-2`}
              >
                Empresas
              </p>
              {activeTabView === "empresas" && (
                <div className="tab-indicator" />
              )}
            </button>
            <button
              className={`${
                activeTabView === "noticias"
                  ? darkMode
                    ? "active-noticias"
                    : ""
                  : ""
              } flex-grow mr-0 mb-2`}
              onClick={() => setActiveTabView("noticias")}
            >
              <p
                className={`${darkMode ? "dark-text-white" : ""} ${
                  activeTabView === "noticias"
                    ? "font-bold"
                    : "font-bold text-opacity-60"
                } mb-2`}
              >
                Noticias
              </p>
              {activeTabView === "noticias" && (
                <div className="tab-indicator" />
              )}
            </button>

            <button
              className={`${
                activeTabView === "tendencias"
                  ? darkMode
                    ? "active-tendencias"
                    : ""
                  : ""
              } flex-grow mr-0 mb-2`}
              onClick={() => setActiveTabView("tendencias")}
            >
              <p
                className={`${darkMode ? "dark-text-white" : ""} ${
                  activeTabView === "tendencias"
                    ? "font-bold"
                    : "font-bold text-opacity-60"
                } mb-2`}
              >
                Tendencias
              </p>
              {activeTabView === "tendencias" && (
                <div className="tab-indicator" />
              )}
            </button>
          </div>
        </div>
      )}
      {isBusinessVisible && (
        <div className="w-full h-screen overflow-y-auto p-2">
          {/* TO-DO: reisar si es necesaria la seccion de recent search */}
          {/* <div>
            {recentSearches.map((term, index) => (
              <div
                key={index}
                className="flex cursor-pointer"
                onClick={() => handleRecentSearch(term)}
              >
                <p>{term}</p>
              </div>
            ))}
          </div> */}
          <div>
            {businesses.map((business) => (
              <div className="mb-2" key={business._id_business}>
                <div
                  className="flex flex-col"
                  onClick={() => handleBusinessClick(business)}
                >
                  <p className="text-lg">{business.name}</p>
                  <p className="text-sm text-gray-700	text-black">
                    {business.entity} - {business.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isPeopleVisible && (
        <div className="w-full h-screen overflow-y-auto p-2">
          {/* TO-DO:revisar si es necesaria esta seccion */}
          {/* <div>
            {recentSearches.map((term, index) => (
              <div
                key={index}
                className="flex cursor-pointer"
                onClick={() => handleRecentSearch(term)}
              >
                <p>{term}</p>
              </div>
            ))}
          </div> */}
          <div>
            {searchUser.map((users) => (
              <div key={users._id_user}>
                <div
                  onClick={() => handleUserClick(users)}
                  className="flex cursor-pointer mb-4"
                >
                  {/* <h2 className="mr-3">
                    {users.name} {users.last_name}
                  </h2> */}
                  <img
                    src={
                      users.profile_picture_url
                        ? users.profile_picture_url
                        : proSet
                    }
                    alt="Imagen"
                    className="w-12 h-12 mr-2 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-lg">
                      {users.name} {users.last_name}
                    </p>
                    <p className="text-sm text-gray-700	text-black">
                      @{users.nick_name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTabView === "parati" && isSearchVisible == false && (
        <Slider
          images={[BannerHow1, BannerHow2, BannerHow3, BannerHow4, BannerHow5]}
        />
      )}
      {activeTabView === "empresas" && (
        <div>
          {businesses.map((business) => (
            <div className="mb-2" key={business._id_business}>
              <div
                className="flex flex-col"
                onClick={() => handleBusinessClick(business)}
              >
                <p className="text-lg">{business.name}</p>
                <p className="text-sm text-gray-700	text-black">
                  {business.entity} - {business.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTabView === "noticias" && (
        <>
          <Slider images={[BannerNoticias1, BannerNoticias2]} />
          <div
            className="article-list h-full"
            style={{
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {articles.map((article) => (
              <Article
                key={article._id_article}
                article={article}
                FunctionContext={FunctionContext}
              />
            ))}
          </div>
        </>
      )}
      {activeTabView === "tendencias" && (
        <div>
          <Slider images={[BannerTendencias1, BannerTendencias2]} />
        </div>
      )}
    </div>
  );
};

export default Searchbar;
