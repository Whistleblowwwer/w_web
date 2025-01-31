import logoN from "../assets/NavLogo.png";
import proSet from "../assets/defaultProfilePicture.webp";
import { useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, handleUserClick }) => {
  const navigate = useNavigate();
  return (
    <nav
      className={`bg-[#FFF] w-full lg:hidden fixed top-0 p-4 z-50 ${
        darkMode ? "dark-bg" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <img src={logoN} alt="Logo" onClick={() => navigate("/home")} />
        <div className="flex items-center space-x-4">
          <i
            onClick={() => navigate("/notificaciones")}
            className={`fa-solid fa-bell ${darkMode ? "dark-text-white" : ""}`}
            style={{ fontSize: "18px" }}
          ></i>
          <img
            onClick={handleUserClick}
            src={proSet}
            alt="Imagen"
            className="cursor-pointer w-[5%] h-auto"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
