import { useLocation } from "react-router-dom";

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
}) => {
  const location = useLocation();
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
        <input
          value={search}
          className="h-[35px] absolute bg-zinc-500 bg-opacity-10 rounded-lg pl-10 p-2 inline-flex w-full focus:outline-none"
          placeholder={`Buscar establecimiento`}
          onChange={(e) => handleSearch(e.target.value)}
          onClick={(e) => handleSearch(e.target.value)}
        />
        <div className="overflow-y-auto max-h-[200px] mt-10">
          <div>
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
          </div>
        </div>
      </div>
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
            {activeTabView === "noticias" && <div className="tab-indicator" />}
          </button>
          <button
            className={`${
              activeTabView === "empresas"
                ? darkMode
                  ? "active-empresas"
                  : ""
                : ""
            } flex-grow mr-2 mb-2 `}
            onClick={() => setActiveTabView("empresas")}
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
            {activeTabView === "empresas" && <div className="tab-indicator" />}
          </button>
        </div>
        {/* AQUI IRAN LAS FOTOS */}
      </div>
    </div>
  );
};

export default Searchbar;
