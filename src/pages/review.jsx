import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NewCommentModal } from "../components";

import { PostCard } from "../components";

export default function Review({ setAuth, darkMode, FunctionContext }) {
  const {
    handleBusinessClick,
    handleUserClick,
    handleReview,
    handleChildComments,
    handleLike,
    // handleCommentClick,
    handleCommentComment,
    handleCommentReview,
    handleNewCommnentFromReview,
  } = useContext(FunctionContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [fetchResult, setFetchResult] = useState(undefined);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [idReviewComment, setIdReviewComment] = useState("");
  const [isCommentingReview, setIsCommentingReview] = useState(undefined);
  const [idReview, setIdReview] = useState("");
  const [commentedComment, setCommentedComment] = useState("");

  const reviewOrCommentData = location.state.isComment
    ? location.state.comment
    : location.state.reviewValue;

  const handleTextCommnetChange = (event) => {
    setTextComment(event.target.value);
  };

  const handleCommentClickAux = (
    _id_review,
    isComment,
    _id_parent,
    _id_comment
  ) => {
    if (isComment) {
      setIdReviewComment(_id_review);
      setIdReview(_id_parent);
      setIsCommentingReview(false);
      setCommentModalOpen(true);
      setTextComment("");
      setCommentedComment(_id_comment);
    } else {
      setIdReviewComment(_id_review);
      setIdReview(_id_parent);
      setIsCommentingReview(true);
      setCommentModalOpen(true);
      setTextComment("");
    }
  };

  const handleNewComment = () => {
    handleNewCommnentFromReview(
      idReviewComment,
      isCommentingReview,
      idReview,
      textComment
    );

    if (isCommentingReview) {
      const auxCommentObject = {
        content: textComment,
        is_valid: true,
        createdAt: "2024-02-08T18:51:46.559Z",
        updatedAt: "2024-02-08T18:51:46.559Z",
        _id_review: "",
        _id_parent: null,
        likesCount: 0,
        commentsCount: 0,
        is_liked: false,
        User: {
          _id_user: "",
          name: localStorage.userName,
          last_name: localStorage.last_name,
          nick_name: localStorage.userName + localStorage.last_name,
          profile_picture_url: null,
          is_followed: false,
        },
        Images: [],
      };

      setFetchResult((prevFetchResult) => ({
        ...prevFetchResult,
        Comments: [auxCommentObject, ...prevFetchResult?.Comments],
      }));
    } else {
      if (!location.state.isComment) {
        setFetchResult((prevFetchResult) => ({
          ...prevFetchResult,
          Comments: prevFetchResult?.Comments.map((prevPost) => {
            if (prevPost._id_comment === commentedComment) {
              return {
                ...prevPost,
                commentsCount: prevPost.commentsCount + 1,
              };
            }
            return prevPost;
          }),
        }));
      } else {
        setFetchResult((prevFetchResult) => ({
          ...prevFetchResult,
          comment: {
            ...prevFetchResult.comment,
            Comments: prevFetchResult.comment.Comments.map((prevPost) => {
              if (prevPost._id_comment === commentedComment) {
                return {
                  ...prevPost,
                  commentsCount: prevPost.commentsCount + 1,
                };
              }
              return prevPost;
            }),
          },
        }));
      }
    }

    setIdReviewComment("");
    setIsCommentingReview(undefined);
    setIdReview("");
    setTextComment("");
    setCommentModalOpen(!commentModalOpen);
  };

  useEffect(() => {
    async function getPostes() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      const urlFetch = location.state.isComment
        ? `https://api.whistleblowwer.net/comments/children/?_id_comment=${reviewOrCommentData._id_comment}`
        : `https://api.whistleblowwer.net/reviews/info/?_id_review=${reviewOrCommentData._id_review}`;
      try {
        const response = await fetch(urlFetch, requestOptions);
        const parseRes = await response.json();
        setFetchResult(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    }
    getPostes();
  }, [location.state]);

  const handleLikeComment = (_id_comment) => {
    async function commentLike() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      try {
        const url = `https://api.whistleblowwer.net/users/comments/like/?_id_comment=${_id_comment}`;
        const response = await fetch(url, requestOptions);

        const parseRes = await response.json();
        if (
          parseRes.message === "Comment liked successfully" ||
          parseRes.message === "Comment unliked successfully"
        ) {
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    commentLike();
  };

  return (
    <>
      {commentModalOpen && (
        <NewCommentModal
          handleCommentModal={handleCommentClickAux}
          darkMode={darkMode}
          handleTextCommentChange={handleTextCommnetChange}
          textComment={textComment}
          maxLength={1200}
          addComment={() => handleNewComment()}
          isReview={true}
        />
      )}
      {fetchResult === undefined ? (
        <div className="flex items-center justify-center lg:w-[50%] w-full bg-[#EEEFEF] lg:px-0 p-1">
          <div role="status" className="text-center">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="lg:w-[50%] w-full bg-[#EEEFEF] lg:px-0 p-1">
          <div
            className="flex bg-[#FFF] gap-2 items-center px-3 pt-3 pb-3"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left-long cursor-pointer"></i>
            <p className="text-[20px] font-bold">Post</p>
          </div>
          {location.state.isComment ? (
            <>
              <div className="flex flex-col lg:pb-0">
                <PostCard
                  post={fetchResult?.comment}
                  handleBusinessClick={handleBusinessClick}
                  handleUserClick={handleUserClick}
                  handleReview={handleReview}
                  handleLike={handleLikeComment}
                  handleCommentClick={handleCommentClickAux}
                  isComment={true}
                  isBusiness={false}
                />
                {fetchResult?.comment?.commentsCount > 0 &&
                  fetchResult.comment.Comments.map((post, index) => (
                    <PostCard
                      key={index}
                      post={post}
                      darkMode={darkMode}
                      handleBusinessClick={handleBusinessClick}
                      handleUserClick={handleUserClick}
                      handleReview={handleChildComments}
                      handleLike={handleLikeComment}
                      handleCommentClick={handleCommentClickAux}
                      isComment={true}
                      isBusiness={false}
                    />
                  ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-0.5 mt-0.5 lg:pb-0">
                <PostCard
                  post={fetchResult}
                  darkMode={darkMode}
                  handleBusinessClick={handleBusinessClick}
                  handleUserClick={handleUserClick}
                  handleReview={handleReview}
                  handleLike={handleLike}
                  handleCommentClick={handleCommentClickAux}
                  isComment={false}
                />
                {fetchResult.Comments &&
                  fetchResult.Comments.map((post) => (
                    <PostCard
                      key={post._id_comment}
                      post={post}
                      darkMode={darkMode}
                      handleBusinessClick={handleBusinessClick}
                      handleUserClick={handleUserClick}
                      handleReview={handleChildComments}
                      handleLike={handleLikeComment}
                      handleCommentClick={handleCommentClickAux}
                      isBusiness
                      isComment={true}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
