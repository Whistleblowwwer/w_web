import { formatDate, renderStars } from "../utils";
import proSet from "../assets/Image-40.png";
import paginaEmpre from "../assets/CTA.svg";
import Like from "../assets/Like.svg";
import Liked from "../assets/IsLiked.svg";
import { useState, useEffect } from "react";
import FullPicture from "./FullPicture";
import defaultPp from "../assets/defaultProfilePicture.webp";

const PostCard = ({
  post,
  darkMode,
  handleBusinessClick,
  handleUserClick,
  handleReview,
  handleLike,
  handleCommentClick,
  editable,
  isUserProfile,
  isBusiness,
  isComment,
}) => {
  const [modalPicture, setModalPicture] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(null);
  const [followConditionBusiness, setFollowConditionBusiness] = useState(
    post?.Business?.is_followed
  );

  const handleViewPicture = (picture) => {
    setCurrentPicture(picture);
    setModalPicture(!currentPicture);
  };

  const handleFollowBusiness = async (idbusiness) => {
    async function followBusiness() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://api.whistleblowwer.net/users/business/follow/?_id_business=${idbusiness}`,
          requestOptions
        );
        const parseRes = await response.json();
        console.log(parseRes);

        // Actualizar el estado local
        setFollowConditionBusiness(!followConditionBusiness);
      } catch (err) {
        console.error(err.message);
      }
    }

    followBusiness();
  };

  const handleFollowUser = () => {
    async function followUser() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://api.whistleblowwer.net/users/follow/?_id_followed=`,
          requestOptions
        );
        const parseRes = await response.json();
        console.log(parseRes);
        window.location.reload();
      } catch (err) {
        console.error(err.message);
      }
    }
    followUser();
  };

  // useEffect(() => {
  //   async function handleDeletePost() {
  //     const myHeaders = new Headers();
  //     myHeaders.append("authorization", `Bearer ${localStorage.token}`);
  //     const requestOptions = {
  //       method: "PATCH",
  //       headers: myHeaders,
  //       redirect: "follow",
  //     };

  //     try {
  //       const response = await fetch(
  //         "https://api.whistleblowwer.net/reviews/?_id_review=",
  //         requestOptions
  //       );
  //       const parseRes = await response.json();
  //       console.log(parseRes);
  //     } catch (err) {
  //       console.error("path error", err.message);
  //     }
  //   }
  //   handleDeletePost();
  // }, []);

  const storedUserName = localStorage.getItem("userName");
  const storedUserId = localStorage.getItem("userId");

  return (
    <>
      {modalPicture && (
        <FullPicture
          darkMode={darkMode}
          picture={currentPicture}
          handleViewPicture={handleViewPicture}
        />
      )}
      <div
        className={`bg-[#FFF] p-4 flex flex-col gap-4 ${
          darkMode ? "dark-register-bg" : ""
        }`}
      >
        {!isBusiness && post?.Business && (
          <button
            className="bg-[rgba(255, 255, 255, 0.5)] flex justify-between items-center"
            onClick={() => handleBusinessClick(post?.Business)}
          >
            <p className="text-black text-base font-bold">
              {post?.Business?.name}
            </p>
            <img src={paginaEmpre} alt="empresa" />
          </button>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center cursor-pointer">
            <div className={`flex justify-between items-center`}>
              <div
                className={`flex justify-between items-center ${
                  !isUserProfile && "cursor-pointer"
                }`}
                onClick={() =>
                  isUserProfile ? {} : handleUserClick(post?.User)
                }
              >
                <div className="flex flex-col">
                  <img
                    src={
                      post?.User.profile_picture_url
                        ? post?.User.profile_picture_url
                        : defaultPp
                    }
                    alt="Imagen"
                    className="w-[35px] h-[35px] relative mb-[-23%]"
                  />
                  {editable === "true" &&
                  storedUserName === post?.User?.name ? (
                    <p></p>
                  ) : (
                    <button className="w-[15px] h-[15px] rounded-full border border-solid border-black flex items-center justify-center bg-[#141414] text-[#FFF] z-20">
                      +
                    </button>
                  )}
                </div>
                <p
                  className={`text-black text-base font-bold ml-3 ${
                    darkMode ? "dark-text-white" : ""
                  }`}
                >
                  {post?.User?.name} {post?.User?.last_name}
                  <span
                    className={`flex text-center text-neutral-400 text-sm font-light ${
                      darkMode ? "dark-text-white" : ""
                    }`}
                  >
                    {post?.User?.nick_name} . {formatDate(post?.createdAt)}
                  </span>
                </p>
              </div>
              <p
                className="text-indigo-400 text-base font-semibold pl-2"
                onClick={() => handleFollowBusiness(post.Business._id_business)}
              >
                {followConditionBusiness ? "Siguiendo" : "Unirte"}
              </p>
            </div>
            {isUserProfile && editable == "true" ? (
              <div className="relative">
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className={`w-8 h-8 ${darkMode && "dark-text-white"}`}
                >
                  <path d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                </svg>
              </div>
            ) : (
              <p
                className={`text-gray-400 text-s font-light leading-normal ${
                  darkMode ? "dark-text-white" : ""
                }`}
              >
                Es una empresa
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p
              className={`cursor-pointer prevent-word-break text-black text-sm font-normal leading-normal tracking-wide${
                darkMode ? "dark-text-white" : ""
              }`}
              onClick={() => handleReview(post)}
            >
              {post?.content}
            </p>
            {post?.Images && post?.Images.length > 0 && (
              <div className="grid grid-rows-2 grid-flow-col gap-2 max-h-[250px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500] 2xl:max-h-[700px]">
                {post?.Images.slice(0, 3).map((image, index) => (
                  <div
                    onClick={() => handleViewPicture(image)}
                    className={` cursor-pointer
                      ${
                        index < 1
                          ? "row-span-2"
                          : post?.Images.length < 3
                          ? "row-span-2"
                          : "row-span-1"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`post? ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {!isComment && (
            <div className="flex items-center">
              {renderStars(post?.rating, darkMode, false)}
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2 w-full">
            <img
              src={post?.is_liked ? Liked : Like}
              alt="like"
              className="relative"
              style={{
                height: "25px",
                width: "25px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleLike(isComment ? post?._id_comment : post?._id_review)
              }
            />
            <div
              className="bg-[#F5F5F5] px-6 py-3 rounded-full w-full cursor-pointer text-gray-400"
              onClick={() =>
                handleCommentClick(
                  isComment ? post?._id_comment : post?._id_review
                )
              }
            >
              Escribe una respuesta...
            </div>
          </div>
          <div className="flex space-x-4">
            <p
              className={`text-gray-400 text-s font-light leading-normal ${
                darkMode ? "dark-text-white" : ""
              }`}
            >
              {post?.likesCount} me gusta
            </p>
            <p
              className={`text-gray-400 text-s font-light leading-normal ${
                darkMode ? "dark-text-white" : ""
              }`}
            >
              {post?.commentsCount} comentarios
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
