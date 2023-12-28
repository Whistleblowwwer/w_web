import { useState, useEffect } from "react";
import logoN from "../assets/NavLogo.png";
import proSet from "../assets/defaultProfilePicture.webp";
import { useNavigate, useLocation } from "react-router-dom";
import { getHeadersBase } from "../utils/getHeaders";
import defaultPp from "../assets/defaultProfilePicture.webp";

export default function Search({ setAuth }) {
  const location = useLocation();
  const recentSearches = location.state ? location.state.searchValue : null;

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
      <div className="flex flex-col gap-4">
        <h1 className="text-[22px] font-semibold mb-2">Filtros</h1>
        <div className="flex flex-col gap-2 p-2 rounded-lg border-2 border-[#EEEFEF]">
          <p className="font-bold">Personas</p>
          <div>
            <label className="flex justify-between">
              De cualquiera
              <input type="radio" name="peopleOptions" defaultChecked />
            </label>
            <label className="flex justify-between">
              Personas a las que sigues
              <input type="radio" name="peopleOptions" />
            </label>
          </div>
          <p className="font-bold">Ubicacion</p>
          <div>
            <label className="flex justify-between">
              En cualquier lugar
              <input type="radio" name="locationOptions" defaultChecked />
            </label>
            <label className="flex justify-between">
              Cerca de ti
              <input type="radio" name="locationOptions" />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-[#EEEFEF]">
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
        </div>
      </div>
    </div>
  );
}
