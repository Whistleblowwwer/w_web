import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { PostCard } from "../components";

export default function Review({ setAuth, darkMode, FunctionContext }) {
  const {
    handleBusinessClick,
    handleUserClick,
    handleReview,
    handleLike,
    handleCommentClick,
  } = useContext(FunctionContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [postWithComments, setPostWithComments] = useState([]);
  const reviewValue = location.state ? location.state.reviewValue : null;

  useEffect(() => {
    async function getPostes() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `http://3.135.121.50:4000/reviews/info/?_id_review=${reviewValue._id_review}`,
          requestOptions
        );
        const parseRes = await response.json();
        setPostWithComments(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    }
    getPostes();
  }, [reviewValue]);

  console.log(postWithComments);

  return (
    <>
      <div className="lg:w-[50%] w-full bg-[#EEEFEF] lg:px-0 p-1">
        <div className="flex bg-[#FFF]">
          <i
            class="fa-solid fa-arrow-left-long mt-2 mr-4 cursor-pointer"
            onClick={() => navigate("/home")}
          ></i>
          <p className="text-[20px] font-bold">Post</p>
        </div>
        <PostCard
          post={postWithComments}
          darkMode={darkMode}
          handleBusinessClick={handleBusinessClick}
          handleUserClick={handleUserClick}
          handleReview={handleReview}
          handleLike={handleLike}
          handleCommentClick={handleCommentClick}
        />
        {postWithComments.Comments &&
          postWithComments.Comments.map((post, index) => (
            <PostCard
              key={index}
              post={post}
              darkMode={darkMode}
              handleBusinessClick={handleBusinessClick}
              handleUserClick={handleUserClick}
              handleReview={handleReview}
              handleLike={handleLike}
              handleCommentClick={handleCommentClick}
              isBusiness
              isChild
            />
          ))}
      </div>
    </>
  );
}
