import { useState, useEffect, useContext } from "react";
import { uploadFiles } from "../utils";
import { getHeadersBase } from "../utils/getHeaders";

import { useNavigate, useLocation } from "react-router-dom";

import {
  differenceInMilliseconds,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  parseISO,
} from "date-fns";
import { ProfileSection } from "../components";

export default function BusinessProfile({
  setAuth,
  darkMode,
  FunctionContext,
}) {
  const { handleCommentClick } = useContext(FunctionContext);

  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  //empresa variables
  const location = useLocation();
  const business = location.state ? location.state.business : null;
  const [businessDetails, setBusinessDetails] = useState("");

  //post variables
  const [textPost, setText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [reviewRating, setReviewRating] = useState(0);

  //general variables
  const [activeTabView, setActiveTabView] = useState("reseñas");

  const [isTyping, setIsTyping] = useState(false);
  const [showPublishIcon, setShowPublishIcon] = useState(false);
  const [name, setName] = useState("");
  const [postes, setPostes] = useState([]);
  const navigate = useNavigate();

  const maxLength = 1200;

  const formatDate = (createdAt) => {
    const parsedDate = parseISO(createdAt);
    const currentDate = new Date();
    const millisecondsDifference = differenceInMilliseconds(
      currentDate,
      parsedDate
    );
    const secondsDifference = Math.floor(millisecondsDifference / 1000);
    const hoursDifference = differenceInHours(currentDate, parsedDate);
    const daysDifference = differenceInDays(currentDate, parsedDate);
    const monthsDifference = differenceInMonths(currentDate, parsedDate);

    if (secondsDifference < 60) {
      return `${secondsDifference}s`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference}h`;
    } else if (daysDifference < 30) {
      return `${daysDifference}d`;
    } else {
      return `${monthsDifference}m`;
    }
  };

  //ADD POST FUNCTIONS

  const handleRatingClick = (clickedRating) => {
    setReviewRating(clickedRating);
  };

  const handleTextChange2 = (event) => {
    setText(event.target.value);
    if (textPost === "") {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };

  useEffect(() => {
    if (textPost !== "" && reviewRating > 0) {
      setShowPublishIcon(true);
    } else {
      setShowPublishIcon(false);
    }
  }, [textPost, reviewRating]);

  const headersBase = getHeadersBase();

  const handleAddPost = async () => {
    async function createReview() {
      const body = JSON.stringify({
        content: textPost,
        _id_business: businessDetails._id_business,
        rating: reviewRating,
      });

      headersBase.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: headersBase,
        body: body,
        redirect: "follow",
      };

      const response = await fetch(
        "https://api.whistleblowwer.net/reviews",
        requestOptions
      );
      const jsonRes = await response.json();

      setText("");
      setReviewRating(0);
      setShowPublishIcon(false);
      return jsonRes;
    }
    const post = await createReview();
    let auxPostJson = post?.review;

    if (
      post.message === "Review created successfully" &&
      selectedImages.length > 0
    ) {
      headersBase.delete("Content-Type");

      try {
        const res = await uploadFiles(
          `https://api.whistleblowwer.net/bucket/review?_id_review=${post.review._id_review}`,
          headersBase,
          selectedImages,
          selectedImages.length > 1 ? true : false
        );
        auxPostJson.Images = res.Images;
      } catch (error) {
        console.error("Error al subir los archivos:", error);
      }
    }
    setPostes([auxPostJson, ...postes]);
    setText("");
    setSelectedImages([]);
    setReviewRating(0);
  };

  //GET POSTS FUNCTIONS

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
        if (business && business._id_business) {
          const businessId = business._id_business;

          const response = await fetch(
            `https://api.whistleblowwer.net/reviews/business/?_id_business=${businessId}`,
            requestOptions
          );
          const parseRes = await response.json();
          setPostes(parseRes.reviews);
        } else {
          console.error(
            "El objeto business no tiene la propiedad _id_business"
          );
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    getPostes();
  }, [business]);

  //GET BUSINESS INFO FUNCTIONS

  useEffect(() => {
    async function getBusinessDetails() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        if (business && business._id_business) {
          const businessId = business._id_business;
          const response = await fetch(
            `https://api.whistleblowwer.net/business/details/?_id_business=${businessId}`,
            requestOptions
          );
          const parseRes = await response.json();
          setBusinessDetails(parseRes.business);
        } else {
          console.error(
            "El objeto business no tiene la propiedad _id_business"
          );
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    getBusinessDetails();
  }, [business]);

  //GET CURRENT USER INFO FUNCTION

  useEffect(() => {
    async function getName() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://api.whistleblowwer.net/users",
          requestOptions
        );
        const parseRes = await response.json();
        setName(parseRes.user.name);
      } catch (err) {
        console.error(err.message);
      }
    }
    getName();
  }, []);

  //HANDLE LIKES AND COMMENTS FUNCTIONS

  const handleLike = (_id_review) => {
    async function postLike() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      try {
        setPostes((prevPostes) => {
          return prevPostes.map((prevPost) => {
            if (prevPost._id_review === _id_review) {
              return {
                ...prevPost,
                is_liked: !prevPost.is_liked, // Invertir el estado
                likesCount: prevPost.is_liked
                  ? prevPost.likesCount - 1
                  : prevPost.likesCount + 1,
              };
            }
            return prevPost;
          });
        });
        const url = `https://api.whistleblowwer.net/users/reviews/like/?_id_review=${_id_review}`;
        const response = await fetch(url, requestOptions);
      } catch (err) {
        console.error(err.message);
      }
    }
    postLike();
  };

  const handleReview = async (reviewValue) => {
    navigate(`/review/${reviewValue._id_review}`, { state: { reviewValue } });
  };

  const handleSetActiveTabView = (tabView) => {
    setActiveTabView(tabView);
  };

  const handleUserClick = async (users) => {
    const newRecentSearches = [search, ...recentSearches.slice(0, 3)]; // Guardar los últimos 4 términos
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    navigate(`/${users.name}`, { state: { users } });
  };

  const handleFollowBusiness = () => {
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
          `https://api.whistleblowwer.net/users/business/follow/?_id_business=${businessDetails._id_business}`,
          requestOptions
        );
        if (businessDetails?.is_followed) {
          setBusinessDetails({ ...businessDetails, is_followed: false });
        } else {
          setBusinessDetails({ ...businessDetails, is_followed: true });
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    followBusiness();
  };

  return (
    <>
      <ProfileSection
        darkMode={darkMode}
        username={name.name}
        userDetail={businessDetails}
        activeTabView={activeTabView}
        handleSetActiveTabView={handleSetActiveTabView}
        postes={postes}
        handleReview={handleReview}
        handleLike={handleLike}
        handleUserClick={handleUserClick}
        handleCommentClick={handleCommentClick}
        handleFollow={handleFollowBusiness}
        isBusiness
        handleTextChange2={handleTextChange2}
        textPost={textPost}
        maxLength={maxLength}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        setSelectedCompany={setSelectedCompany}
        reviewRating={reviewRating}
        handleRatingClick={handleRatingClick}
        showPublishIcon={showPublishIcon}
        handleAddPost={handleAddPost}
      />
      {/* <div className="w-1/4 bg-[#FFF] h-screen fixed right-0 p-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <i className="fas fa-search text-gray-700"></i>
            </span>
            <input
              className="h-[35px] bg-zinc-500 bg-opacity-10 rounded-lg pl-10 p-2 inline-flex w-full focus:outline-none"
              placeholder={`Buscar en ${business.name}`}
            />
          </div>
        </div> */}
    </>
  );
}
