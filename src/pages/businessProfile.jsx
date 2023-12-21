import { useState, useEffect, useContext } from "react";
import logoN from "../assets/NavLogo.png";
import proSet from "../assets/Image-40.png";
import Location from "../assets/Location.svg";
import Like from "../assets/Like.svg";
import Comment from "../assets/Comment Review.svg";
import Share from "../assets/Send.svg";
import {
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";

import {
  differenceInMilliseconds,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  format,
  parseISO,
} from "date-fns";
import { NewCommentModal, NewPostModal, ProfileSection } from "../components";

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
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [textPost, setText] = useState("");
  const [textPost2, setText2] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  //comments variables
  // const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [idReviewComment, setIdReviewComment] = useState("");

  //general variables
  const [activeButton, setActiveButton] = useState("home");
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

  const handlePostModal = () => {
    setPostModalOpen(!postModalOpen);
  };

  const handlePostTextChange = (event) => {
    setText(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsTyping(true);
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };
  console.log("commnent text", textComment);
  const handleTextCommnetChange = (event) => {
    setTextComment(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  // const handleCommentClick = (_id_review) => {
  //   setIdReviewComment(_id_review);
  //   setCommentModalOpen(!commentModalOpen);
  //   console.log("Comment clicked!");
  //   console.log("Comment modal status => ", commentModalOpen);
  // };

  const handleTextChange2 = (event) => {
    setText2(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsTyping(true);
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
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
        console.log(parseRes.user.name);
        setName(parseRes.user.name);
      } catch (err) {
        console.error(err.message);
      }
    }
    getName();
  }, []);

  const addPost = () => {
    if (textPost || selectedImages.length > 0) {
      const newPost = {
        text: textPost,
        images: selectedImages.map((file) => URL.createObjectURL(file)),
      };
      setPosts([newPost, ...posts]);
      setText("");
      setSelectedImages([]);
      handlePostModal();
    } else if (textPost || selectedImages.length <= 0) {
      const newPost = {
        text: textPost,
        images: [],
      };
      setPosts([newPost, ...posts]);
      setText("");
      handlePostModal();
    }
  };

  const addPost2 = () => {
    if (textPost2 || selectedImages.length > 0) {
      const newPost = {
        text: textPost2,
        images: selectedImages.map((file) => URL.createObjectURL(file)),
      };
      setPosts([newPost, ...posts]);
      setText2("");
      setSelectedImages([]);
      setShowPublishIcon(false);
      handlePostModal();
    } else if (textPost2 || selectedImages.length <= 0) {
      const newPost = {
        text: textPost2,
        images: [],
      };
      setPosts([newPost, ...posts]);
      setText2("");
      handlePostModal();
      setShowPublishIcon(false);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  const handleLike = (_id_review) => {
    console.log("Liked - ID => ", _id_review);
    async function postLike() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      try {
        const url = `https://api.whistleblowwer.net/users/reviews/like/?_id_review=${_id_review}`;
        const response = await fetch(url, requestOptions);
        const parseRes = await response.json();
      } catch (err) {
        console.error(err.message);
      }
    }
    postLike();
  };

  const handleComment = () => {
    console.log("comment - ID => ", idReviewComment);
    async function postComment() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      console.log("content", textComment);
      var raw = JSON.stringify({
        content: textComment,
        _id_review: idReviewComment,
      });
      console.log("idreviww", idReviewComment);

      console.log("raw", raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://api.whistleblowwer.net/comments",
          requestOptions
        );
      } catch (err) {
        console.error(err.message);
      }
    }
    postComment();
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
        const parseRes = await response.json();

        window.location.reload();
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
