import { useNavigate } from "react-router-dom";
import { BOTTOM_NAVBAR_LINKS } from "../constants";

const BottomNavbar = ({ darkMode }) => {
  const navigate = useNavigate();

  return (
    <footer
      className={`bg-[#FFF] w-full lg:hidden fixed bottom-0 p-4 z-50 ${
        darkMode ? "dark-bg" : ""
      }`}
    >
      <div className="flex justify-around items-center">
        {BOTTOM_NAVBAR_LINKS.map((link) => (
          <i
            class={`fa-solid ${link.icon} ${
              darkMode ? "dark-text-white" : ""
            } text-[130%] iconeres`}
            onClick={() => navigate(link.href)}
          ></i>
        ))}
      </div>
    </footer>
  );
};

export default BottomNavbar;
