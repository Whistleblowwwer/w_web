import { useNavigate } from "react-router-dom";

import logoN from "../assets/NavLogo.png";
import proSet from "../assets/Image-40.png";
import Location from "../assets/Location.svg";
import Like from "../assets/Like.svg";
import Comment from "../assets/Comment Review.svg";
import Liked from "../assets/IsLiked.svg";
import paginaEmpre from "../assets/CTA.svg";
import Share from "../assets/Send.svg";
import { formatDate, renderStars } from "../utils";
import { USER_PROFILE_TABS } from "../constants";
import PostCard from "./PostCard";
import chatIcon from "../assets/chatIcon.png";

const ProfileSection = ({
  darkMode,
  username,
  userDetail,
  setUpdateModalOpen,
  editable,
  activeTabView,
  handleSetActiveTabView,
  postes,
  handleUserClick,
  handleBusinessClick,
  handleReview,
  handleLike,
  handleCommentClick,
  handleFollow,
  isUserProfile,
  isBusiness,
}) => {
  const navigate = useNavigate();

  console.log("user detsil", userDetail);

  const handleNavigate = () => {
    // Navigate to a different page
    navigate("/chats", { state: { id_user: userDetail?._id_user } });
  };

  return (
    <div className="lg:w-[50%] w-full bg-[#EEEFEF] lg:px-0 p-1">
      <div className={`bg-[#FFF] ${darkMode ? "dark-register-bg" : ""}`}>
        <div className="w-[100%] h-auto pb-3 pl-3 pt-1 pr-3 bg-gradient-to-b from-white to-[#d78fa3]">
          <div className="flex mb-[20%]">
            <i
              class="fa-solid fa-arrow-left-long mt-2 mr-2 cursor-pointer"
              onClick={() => navigate(-1)}
            ></i>
            <p className="text-[20px] font-bold">
              {isBusiness
                ? `${userDetail.name}, ${userDetail.state}`
                : username}
            </p>
          </div>
          {isBusiness && (
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-white text-base font-bold">
                  {userDetail.name}
                </p>
                <div className="flex items-center">
                  {renderStars(userDetail.average_rating, darkMode)}
                  <p className="opacity-90 text-[#D9D9D9]">
                    ({Math.round(userDetail.average_rating)})
                  </p>
                </div>
              </div>
              <button
                className="w-auto relative translate-y-[14%] h-10 px-4 bg-neutral-100 rounded-[20px] flex-col justify-center items-start gap-4"
                onClick={handleFollow}
              >
                <div className="text-black text-base font-semibold leading-10">
                  hola
                </div>
                <div className="text-black text-base font-semibold leading-10">
                  {userDetail.is_followed ? "Dejar de seguir" : "Seguir"}
                </div>
              </button>
            </div>
          )}
        </div>
        {isBusiness ? (
          <div className="flex flex-col lg:flex-row px-3 pt-3 gap-3 lg:gap-5">
            <div className="flex gap-2">
              <img src={Location} alt="location" />
              <p>
                {userDetail.city}, <span>{userDetail.country}</span>
              </p>
            </div>
            <div className="opacity-30 flex items-center gap-2">
              <i class="fa-regular fa-calendar"></i>
              {userDetail && (
                <p>
                  Se creó el{" "}
                  {new Date(userDetail.createdAt).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex lg:flex-row flex-col lg:items-start items-center justify-between px-3">
            <div className="rounded-full w-[202px] h-[202px] bg-[#FFF] flex justify-center items-center mt-[-13%]">
              <div className="rounded-full w-[196px] h-[196px] bg-[#D9D9D9]"></div>
            </div>
            <div className="flex items-center lg:items-end flex-col md:flex-row lg:flex-col xl:flex-row gap-2 pt-3 justify-between w-full lg:w-auto lg:justify-end">
              <div className="opacity-30 flex items-center text-right py-1.5 gap-1">
                <i class="fa-regular fa-calendar"></i>
                {userDetail && (
                  <p>
                    Se creó el{" "}
                    {new Date(userDetail.createdAt).toLocaleDateString(
                      "es-MX",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                )}
              </div>
              <div>
                <img
                  src={chatIcon}
                  alt="Ir al chat"
                  className="w-8 h-8 rounded-full ml-4 mr-2"
                  onClick={() => handleNavigate()}
                />
              </div>
              <button
                onClick={
                  editable === "true" ? setUpdateModalOpen : handleFollow
                }
                className="bg-neutral-100 h-full rounded-xl px-3 py-1.5"
              >
                <p className="text-black text-[14px] font-bold">
                  {editable === "true" ? "Editar perfil" : "Seguir"}
                </p>
              </button>
            </div>
          </div>
        )}
        <div className="px-3 pt-3 flex flex-col gap-3">
          <div className="flex gap-4">
            <p>
              <span className="mr-1 text-black font-bold">
                {userDetail.followers}
              </span>
              Seguidores
            </p>
            <p>
              <span className="mr-1 text-black font-bold">
                {isBusiness ? postes.length : userDetail.followings}
              </span>
              {isBusiness ? "Reseñas" : "Siguiendo"}
            </p>
          </div>
          <p>Siguen a este grupo</p>
          <div className="flex">
            {USER_PROFILE_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`w-1/3 ${
                  activeTabView === tab.tabName
                    ? darkMode
                      ? tab.active
                      : ""
                    : ""
                }`}
                onClick={() => handleSetActiveTabView(tab.tabName)}
              >
                <p
                  className={`${darkMode ? "dark-text-white" : ""} ${
                    activeTabView === tab.tabName
                      ? "font-bold"
                      : "font-bold text-opacity-60"
                  } capitalize`}
                >
                  {tab.tabName}
                </p>
                {activeTabView === tab.tabName && (
                  <div className="tab-indicator" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-1 lg:pb-0 pb-14">
        {postes.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            darkMode={darkMode}
            handleUserClick={handleUserClick}
            handleBusinessClick={handleBusinessClick}
            handleCommentClick={handleCommentClick}
            handleLike={handleLike}
            handleReview={handleReview}
            isUserProfile={isUserProfile}
            isBusiness={isBusiness}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSection;