import { formatDate, renderStars } from "../utils";
import proSet from "../assets/Image-40.png";
import paginaEmpre from "../assets/CTA.svg";
import Like from "../assets/Like.svg";
import Liked from "../assets/IsLiked.svg";

const PostCard = ({
  post,
  darkMode,
  handleBusinessClick,
  handleUserClick,
  handleReview,
  handleLike,
  handleCommentClick,
  isUserProfile,
  isBusiness,
}) => {
  return (
    <div
      className={`bg-[#FFF] p-4 flex flex-col gap-4 ${
        darkMode ? "dark-register-bg" : ""
      }`}
    >
      {!isBusiness && (
        <button
          className="bg-[rgba(255, 255, 255, 0.5)] flex justify-between items-center"
          onClick={() => handleBusinessClick(post.Business)}
        >
          <p className="text-black text-base font-bold">{post.Business.name}</p>
          <img src={paginaEmpre} alt="empresa" />
        </button>
      )}

      <div className="flex flex-col gap-2">
        <div
          className={`flex items-center max-w-fit ${
            !isUserProfile && "cursor-pointer"
          }`}
          onClick={() => (isUserProfile ? {} : handleUserClick(post.User))}
        >
          <img
            src={proSet}
            alt="Imagen"
            className="w-[35px] h-[35px] relative"
          />
          <p
            className={` text-black text-base font-bold ml-3 ${
              darkMode ? "dark-text-white" : ""
            }`}
          >
            {post.User.name} {post.User.last_name}
            <span
              className={`flex text-center text-neutral-400 text-sm font-light ${
                darkMode ? "dark-text-white" : ""
              }`}
            >
              Hace {formatDate(post.createdAt)}
            </span>
          </p>
        </div>
        <div
          className="cursor-pointer flex flex-col gap-2"
          onClick={() => handleReview(post)}
        >
          <p
            className={`prevent-word-break text-black text-sm font-normal leading-normal tracking-wide${
              darkMode ? "dark-text-white" : ""
            }`}
          >
            {post.content}
          </p>
          {post.Images && post.Images.length > 0 && (
            <div className="grid grid-rows-2 grid-flow-col gap-2 max-h-[250px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500] 2xl:max-h-[700px]">
              {post.Images.slice(0, 3).map((image, index) => (
                <div
                  className={
                    index < 1
                      ? "row-span-2"
                      : post.Images.length < 3
                      ? "row-span-2"
                      : "row-span-1"
                  }
                >
                  <img
                    src={image}
                    alt={`Post ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center">
          {renderStars(post.rating, darkMode, false)}
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2 w-full">
          <img
            src={post.is_liked ? Liked : Like}
            alt="like"
            className="relative"
            style={{
              height: "25px",
              width: "25px",
              cursor: "pointer",
            }}
            onClick={() => handleLike(post._id_review)}
          />
          <div
            className="bg-[#F5F5F5] px-6 py-3 rounded-full w-full cursor-pointer text-gray-400"
            onClick={() => handleCommentClick(post._id_review)}
          >
            Escribe una reseña
          </div>
        </div>
        <div className="flex space-x-4">
          <p
            className={`text-gray-400 text-s font-light leading-normal ${
              darkMode ? "dark-text-white" : ""
            }`}
          >
            {post.likesCount} me gusta
          </p>
          <p
            className={`text-gray-400 text-s font-light leading-normal ${
              darkMode ? "dark-text-white" : ""
            }`}
          >
            {post.commentsCount} comentarios
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
