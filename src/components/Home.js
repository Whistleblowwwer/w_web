import React, { useState, useEffect } from "react";
import logoN from "../assets/NavLogo.png";
import proSet from "../assets/Image-40.png";
import mas from "../assets/Group 99.svg";
import masimagen from "../assets/Group 105.svg";
import paginaEmpre from "../assets/CTA.svg";
import Like from "../assets/Like.svg";
import Liked from "../assets/IsLiked.svg";
import Comment from "../assets/Comment Review.svg";
import Share from "../assets/Send.svg";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import NewPostModal from "../auxComponents/NewPostModal";
import NewCommentModal from "../auxComponents/NewCommentModal";
import CompanyAutocomplete from "../auxComponents/CompanyAutocomplete";
import NewCompanyModal from "../auxComponents/NewCompanyModal";
import {
  differenceInMilliseconds,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  format,
  parseISO,
} from "date-fns";
import { renderStars } from "../utils/renderStars";

const Home = ({ setAuth }) => {
  //search variables
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [searchUser, setSearchUser] = useState([]);

  //post variables
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [textPost, setText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  //comments variables
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [idReviewComment, setIdReviewComment] = useState("");

  //general variables
  const [isTyping, setIsTyping] = useState(false);
  const [activeButton, setActiveButton] = useState("home");
  const [activeFeed, setActiveFeed] = useState("feed");
  const [activeTabView, setActiveTabView] = useState("parati");
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });
  const [showPublishIcon, setShowPublishIcon] = useState(false);
  const [name, setName] = useState([]);
  const [postes, setPostes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [reviewRating, setReviewRating] = useState(0);
  const [companySearchQuery, setCompanySearchQuery] = useState("");
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    name: "",
    address: "",
    entity: "",
    country: "",
    state: "",
    city: "",
    category: "",
  });

  const navigate = useNavigate();
  const maxLength = 1200;

  const handleBusinessClick = async (business) => {
    const newRecentSearches = [search, ...recentSearches.slice(0, 3)]; // Guardar los últimos 4 términos
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    setShowResults(false);
    navigate(`/empresa/${business.name}`, { state: { business } });
  };

  const handleRecentSearch = async (searchValue) => {
    navigate(`/search`, { state: { searchValue } });
  };

  const handleReview = async (reviewValue) => {
    navigate(`/review/${reviewValue._id_review}`, { state: { reviewValue } });
  };

  const handleUserClick = async (users) => {
    const newRecentSearches = [search, ...recentSearches.slice(0, 3)]; // Guardar los últimos 4 términos
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    navigate(`/${users.name}`, { state: { users } });
  };

  const handlePostModal = () => {
    setPostModalOpen(!postModalOpen);
  };

  const handleNewCompanyModal = () => {
    setCompanyModalOpen(!companyModalOpen);
  };

  const handlePostTextChange = (event) => {
    setText(event.target.value);
    if (event.target.value.trim() !== "") {
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };
  const handleTextCommnetChange = (event) => {
    setTextComment(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  const handleCommentClick = (_id_review) => {
    setIdReviewComment(_id_review);
    setCommentModalOpen(!commentModalOpen);
  };

  const handleTextChange2 = (event) => {
    setText(event.target.value);
    if (event.target.value.trim() !== "") {
      setIsTyping(true);
      setShowPublishIcon(true);
    } else {
      setIsTyping(false);
      setShowPublishIcon(false);
    }
  };

  const handleSearch = (e) => {
    const searchValue = typeof e === "string" ? e : "";

    setSearch(searchValue);
    async function getSearchs() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `http://3.135.121.50:4000/business/search?name=${e}&city=&enitty=&country=&address=&state=`,
          requestOptions
        );
        const parseRes = await response.json();
        setBusinesses(parseRes.businesses || []);
      } catch (err) {
        console.error(err.message);
      }
      try {
        const response = await fetch(
          `http://3.135.121.50:4000/users/search?searchTerm=${e}`,
          requestOptions
        );
        const parseRes = await response.json();
        setSearchUser(parseRes.users || []);
      } catch (err) {
        console.error(err.message);
      }
    }
    getSearchs();
  };

  const handleAddPost = () => {
    if (textPost && selectedImages.length > 0) {
      const newPost = {
        text: textPost,
        images: selectedImages.map((file) => URL.createObjectURL(file)),
      };
      setPostes([newPost, ...postes]);
      setText("");
      setSelectedImages([]);
      setShowPublishIcon(false);
      setPostModalOpen(false);
    } else if (textPost && selectedImages.length <= 0) {
      async function postReview() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("authorization", `Bearer ${localStorage.token}`);

        var raw = JSON.stringify({
          content: textPost,
          _id_business: selectedCompany,
          rating: reviewRating,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        const response = await fetch(
          "http://3.135.121.50:4000/reviews",
          requestOptions
        );
        const jsonRes = await response.json();
        setPostes([jsonRes?.review, ...postes]);
      }
      postReview();
      setText("");
      setCompanySearchQuery("");
      setReviewRating(0);
      setPostModalOpen(false);
    }
  };

  const handleLike = (_id_review) => {
    async function postLike() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
      };

      try {
        const url = `http://3.135.121.50:4000/users/reviews/like/?_id_review=${_id_review}`;
        const response = await fetch(url, requestOptions);
        const parseRes = await response.json();
        setPostes((prevPostes) => {
          return prevPostes.map((prevPost) => {
            if (prevPost._id_review === _id_review) {
              return {
                ...prevPost,
                is_liked: !prevPost.is_liked, // Invertir el estado
                likes: prevPost.is_liked ? prevPost.likes : prevPost.likes,
              };
            }
            return prevPost;
          });
        });
      } catch (err) {
        console.error(err.message);
      }
    }
    postLike();
  };

  const handleComment = () => {
    async function postComment() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      var raw = JSON.stringify({
        content: textComment,
        _id_review: idReviewComment,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://3.135.121.50:4000/comments",
          requestOptions
        );
      } catch (err) {
        console.error(err.message);
      }
    }
    setCommentModalOpen(!commentModalOpen);
    postComment();
  };

  const handleCreateBusiness = () => {
    async function createBusiness() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(companyForm),
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://3.135.121.50:4000/business",
          requestOptions
        );
        const parseRes = await response.json();
        console.log(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    }
    setCompanyModalOpen(!companyModalOpen);
    createBusiness();
  };

  const handleSearchCompanyClick = () => {
    async function getCompanies() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://3.135.121.50:4000/business/search?",
          requestOptions
        );
        const parseRes = await response.json();
        setSuggestions(parseRes.businesses || []);
      } catch (err) {
        console.error(err.message);
      }
    }
    getCompanies();
  };

  const handleRatingClick = (clickedRating) => {
    setReviewRating(clickedRating);
  };

  const handleChangeCompany = (e) => {
    console.log("re-remder here!");

    const { name, value } = e.target;
    setCompanyForm((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleSubmitCompany = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", companyForm);
    setCompanyModalOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
          "http://3.135.121.50:4000/reviews/",
          requestOptions
        );
        const parseRes = await response.json();
        setPostes(parseRes.reviews);
      } catch (err) {
        console.error(err.message);
      }
    }

    getPostes();
  }, []);

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
          "http://3.135.121.50:4000/users",
          requestOptions
        );
        const parseRes = await response.json();
        setName(parseRes.user);
      } catch (err) {
        console.error(err.message);
      }
    }
    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  const formatDate = (createdAt) => {
    const parsedDate = parseISO(createdAt);
    const currentDate = new Date();

    const millisecondsDifference = differenceInMilliseconds(
      currentDate,
      parsedDate
    );
    const secondsDifference = Math.floor(millisecondsDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = differenceInHours(currentDate, parsedDate);
    const daysDifference = differenceInDays(currentDate, parsedDate);
    const monthsDifference = differenceInMonths(currentDate, parsedDate);

    if (minutesDifference < 1) {
      return `${secondsDifference}s`;
    } else if (hoursDifference < 1) {
      return `${minutesDifference}m`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference}h`;
    } else if (daysDifference < 30) {
      return `${daysDifference}d`;
    } else {
      return `${monthsDifference}m`;
    }
  };

  useEffect(() => {
    const storedRecentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  return (
    <div
      className={`bg-[#EEEFEF] h-screen w-screen ${
        darkMode ? "dark-login-bg" : ""
      }`}
    >
      {postModalOpen && (
        <NewPostModal
          handlePostModal={handlePostModal}
          darkMode={darkMode}
          proSet={proSet}
          handleTextChange={handlePostTextChange}
          textPost={textPost}
          maxLength={maxLength}
          setSelectedImages={setSelectedImages}
          setShowPublishIcon={setShowPublishIcon}
          addPost={handleAddPost}
          suggestions={suggestions}
          setSelectedCompany={setSelectedCompany}
          companySearchQuery={companySearchQuery}
          setCompanySearchQuery={setCompanySearchQuery}
          handleRatingClick={handleRatingClick}
          reviewRating={reviewRating}
          handleSearchCompanyClick={handleSearchCompanyClick}
        />
      )}
      {commentModalOpen && (
        <NewCommentModal
          handleCommentModal={handleCommentClick}
          darkMode={darkMode}
          proSet={proSet}
          handleTextCommentChange={handleTextCommnetChange}
          textComment={textComment}
          maxLength={maxLength}
          addComment={handleComment}
        />
      )}
      {companyModalOpen && (
        <NewCompanyModal
          handleNewCompanyModal={handleNewCompanyModal}
          handleSubmit={handleSubmitCompany}
          handleChange={handleChangeCompany}
          darkMode={darkMode}
          name={companyForm.name}
          address={companyForm.address}
          entity={companyForm.entity}
          country={companyForm.country}
          state={companyForm.state}
          city={companyForm.city}
          category={companyForm.category}
          handleCreateBusiness={handleCreateBusiness}
        />
      )}
      <div className={`bg-[#EEEFEF] h-auto w-screen flex ${darkMode ? "dark-login-bg" : ""}`}>
          <div className="w-1/5 bg-[#FFF] fixed h-screen">
            <div className="w-[100%] mt-6 ml-[13%] sidebar1">
              <div className="ml-[4%] mb-[8%]">
                <img src={logoN} alt="Logo" />
              </div>
              <div
                className={`margin-top ${
                  darkMode ? "dark-text-white" : ""
                } sidebarcontain`}
              >
                <button
                  className={
                    activeButton === "home"
                      ? darkMode
                        ? "active-buttonH font-bold"
                        : "active-buttonD font-bold"
                      : ""
                  }
                  onClick={() => {
                    setActiveButton("home");
                    navigate("/home");
                  }}
                >
                  <p className="ml-4 text-[20px] p-txt">
                    <i className="p-fa fa-solid fa-house mr-3"></i>Inicio
                  </p>
                </button>
              </div>
              <div
                className={`margin-top mt-6 ${
                  darkMode ? "dark-text-white" : ""
                } sidebarcontain`}
              >
                <button
                  className={
                    activeButton === "noticias"
                      ? darkMode
                        ? "active-buttonH font-bold"
                        : "active-buttonD font-bold"
                      : ""
                  }
                  onClick={() => {
                    setActiveButton("noticias");
                    navigate("/noticias");
                  }}
                >
                  <p className="ml-4 text-[20px] p-txt">
                    <i className="p-fa fa-solid fa-book-open mr-3"></i>Noticias
                  </p>
                </button>
              </div>
              <div
                className={`margin-top mt-6 ${
                  darkMode ? "dark-text-white" : ""
                } sidebarcontain`}
              >
                <button
                  className={
                    activeButton === "search"
                      ? darkMode
                        ? "active-buttonH font-bold"
                        : "active-buttonD font-bold"
                      : ""
                  }
                  onClick={() => {
                    setActiveButton("search");
                    navigate("/search");
                  }}
                >
                  <p className="ml-4 text-[20px] p-txt">
                    <i className="p-fa fa-solid fa-magnifying-glass mr-3"></i>
                    Búsqueda
                  </p>
                </button>
              </div>
              <div
                className={`margin-top mt-6 ${
                  darkMode ? "dark-text-white" : ""
                } sidebarcontain`}
              >
                <button
                  className={
                    activeButton === "notificaciones"
                      ? darkMode
                        ? "active-buttonH font-bold"
                        : "active-buttonD font-bold"
                      : ""
                  }
                  onClick={() => {
                    setActiveButton("notificaciones");
                    navigate("/notificaciones");
                  }}
                >
                  <p className="ml-4 text-[20px] p-txt">
                    <i className="p-fa fa-regular fa-bell mr-3"></i>
                    Notificaciones
                  </p>
                </button>
              </div>
              <div
                className={`margin-top mt-6 ${
                  darkMode ? "dark-text-white" : ""
                } sidebarcontain`}
              >
                <button
                  className={
                    activeButton === "mensajes"
                      ? darkMode
                        ? "active-buttonH font-bold"
                        : "active-buttonD font-bold"
                      : ""
                  }
                  onClick={() => {
                    setActiveButton("mensajes");
                    navigate("/chats");
                  }}
                >
                  <p className="ml-4 text-[20px] p-txt">
                    <i className="p-fa fa-solid fa-inbox mr-3"></i>Mensajes
                  </p>
                </button>
              </div>
              <div className="mt-6">
                <button
                  onClick={handlePostModal}
                  className="rounded-[24px] h-[48px] w-[80%] flex items-center justify-center button-style"
                >
                  <p className="text-white font-bold">Publicar</p>
                </button>
              </div>
              <div className="mt-[100%] ml-[-15px] flex">
                <img
                  src={proSet}
                  alt="Imagen"
                  className="cursor-pointer"
                  onClick={() => handleUserClick(name)}
                />
                <p className={`${darkMode ? "dark-text-white" : ""} pl-[5%]`}>
                  {name.name}
                </p>
                <p
                  className={`${
                    darkMode ? "dark-text-white" : ""
                  } font-bold text-[20px] pl-[50%]`}
                >
                  . . .
                </p>
              </div>
            </div>
          </div>
          <div className="w-[55%] bg-[#EEEFEF] ml-[20%] pr-[0.5%]">
            <div
              className={`w-[100%] h-[260px] bg-[#FFF] ${
                darkMode ? "dark-register-bg" : ""
              } create-post`}
            >
              <div className="flex items-center h-full w-full">
                <div className="w-full flex flex-col">
                  <input
                    className={`input-style w-full h-[120px] rounded-lg bg-gray-50 p-4 ${
                      darkMode ? "dark-register" : ""
                    }`}
                    onChange={handleTextChange2}
                    placeholder="Escribe algo..."
                    value={textPost}
                    style={{ paddingBottom: "90px" }}
                  />
                  <div className="opacity text-gray-500 text-sm mt-1 ml-2">
                    {textPost.length}/{maxLength}
                  </div>
                  <div className="p-4 flex flex-col space-y-2">
                    <label htmlFor="imageUpload" className="ml-1.5">
                      <input
                        value={[]}
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const files = e.target.files;
                          const selected = Array.from(files);
                          setSelectedImages(selected);
                        }}
                      />
                      <img
                        src={masimagen}
                        alt="masimagen"
                        className="cursor-pointer w-[28px] relative"
                      />
                    </label>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex gap-2">
                        <img
                          src={mas}
                          alt="mas"
                          className="w-[38px] relative cursor-pointer"
                          onClick={() => setCompanyModalOpen(true)}
                        />
                        <div onClick={handleSearchCompanyClick}>
                          <CompanyAutocomplete
                            suggestions={suggestions}
                            setSelectedCompany={setSelectedCompany}
                            companySearchQuery={companySearchQuery}
                            setCompanySearchQuery={setCompanySearchQuery}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className={`fa-solid fa-star ${
                                star <= reviewRating ? "dark-text-white" : ""
                              }`}
                              style={{
                                color:
                                  star <= reviewRating ? "#688BFF" : "#D9D9D9",
                                fontSize: "18px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleRatingClick(star)}
                            ></i>
                          ))}
                        </div>
                      </div>
                      <button
                        style={{
                          display: showPublishIcon ? "none" : "block",
                          background: showPublishIcon
                            ? "linear-gradient(267deg, #8E1DA1 0%, #2D015A 100%)"
                            : "#F8F8FB",
                        }}
                        className={`w-[48px] h-[48px] bg-[#F8F8FB] rounded-full ${
                          darkMode ? "dark-button" : ""
                        }`}
                      >
                        <i
                          className={`fa-solid fa-arrow-right mt-1 text-[#A9A9A9] text-[22px] ${
                            darkMode ? "dark-text" : ""
                          }`}
                        ></i>
                      </button>
                      <button
                        onClick={handleAddPost}
                        style={{
                          display: showPublishIcon ? "block" : "none",
                          background: showPublishIcon
                            ? "linear-gradient(267deg, #8E1DA1 0%, #2D015A 100%)"
                            : "#F8F8FB",
                        }}
                        className={`w-[48px] h-[48px] bg-[#F8F8FB] rounded-full ${
                          darkMode ? "dark-button" : ""
                        }`}
                      >
                        <i
                          className={`fa-solid fa-arrow-right mt-1 text-[#FFF] text-[22px] ${
                            darkMode ? "dark-text" : ""
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*
              <div className="flex mt-4">
                <button className={activeFeed === 'feed' ? (darkMode ? 'active-feed': '') : ''} onClick={() => setActiveFeed('feed')}>
                  <p className={`${darkMode ? 'dark-text-white' : ''} ${activeFeed === 'feed' ? 'font-medium' : 'font-light text-opacity-60'} mr-6 ml-1`}>Feed</p>
                </button>
                <button className={activeFeed === 'latest' ? (darkMode ? 'active-feed': '') : ''} onClick={() => setActiveFeed('latest')}>
                  <p className={`${darkMode ? 'dark-text-white' : ''} ${activeFeed === 'latest' ? 'font-medium' : 'font-light text-opacity-60'} mr-6`}>Latest</p>
                </button>
                <button className={activeFeed === 'top' ? (darkMode ? 'active-feed': '') : ''} onClick={() => setActiveFeed('top')}>
                  <p className={`${darkMode ? 'dark-text-white' : ''} ${activeFeed === 'top' ? 'font-medium' : 'font-light text-opacity-60'}`}>Top</p>
                </button>
              </div>
            */}

            <div className="w-[100%] h-auto post-post">
              {postes.map((post, index) => (
                <div
                  key={index}
                  className={`bg-[#FFF] h-auto w-[100%] p-4 mt-1 ${
                    darkMode ? "dark-register-bg" : ""
                  }`}
                >
                  <button
                    className="w-[102.8%] mt-[-18px] ml-[-13px] bg-[rgba(255, 255, 255, 0.5)] h-[50px]"
                    onClick={() => handleBusinessClick(post.Business)}
                  >
                    <div className="flex justify-between items-center">
                      <p className="ml-4 text-black text-base font-bold">
                        {post.Business.name}
                      </p>
                      <img src={paginaEmpre} alt="empresa" className="mr-5" />
                    </div>
                  </button>
                  <div>
                    <div
                      className="flex items-center mt-3 cursor-pointer max-w-fit"
                      onClick={() => handleUserClick(post.User)}
                    >
                      <img
                        src={proSet}
                        alt="Imagen"
                        className="w-[35px] h-[35px] relative"
                      />
                      <p
                        className={`cursor-pointer text-black text-base font-bold ml-3 ${
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
                    <div className="flex items-center mt-2">
                      {renderStars(post.rating, darkMode, false)}
                      {/*                   is selectable?  ^ */}
                    </div>
                    <div
                      className="cursor-pointer pb-7"
                      onClick={() => handleReview(post)}
                    >
                      <p
                        className={`prevent-word-break text-black text-sm font-normal leading-normal tracking-wide mt-2 ${
                          darkMode ? "dark-text-white" : ""
                        }`}
                      >
                        {post.content}
                      </p>
                      {post.images && post.images.length > 0 && (
                        <div className="flex w-[100%] items-center">
                          {post.images.slice(0, 2).map((image, i) => (
                            <img
                              key={i}
                              src={image}
                              alt={`Post ${i}`}
                              className="w-full h-auto mr-3 rounded-lg mt-2"
                              style={{ width: "100%", height: "auto" }}
                            />
                          ))}
                        </div>
                      )}
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
                        {post.is_liked ? post.likes + 1 : post.likes} me gusta
                      </p>
                      <p
                        className={`text-gray-400 text-s font-light leading-normal ${
                          darkMode ? "dark-text-white" : ""
                        }`}
                      >
                        {post.comments} comentarios
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/4 bg-[#FFF] h-screen fixed right-0 p-4">
            <div className="relative mb-[1%]">
              <h1 className="text-[22px] font-semibold mb-2">Buscar</h1>
              <span className="relative translate-y-[150%] left-0 pl-3 flex items-center">
                <i className="fas fa-search text-gray-700"></i>
              </span>
              <input
                value={search}
                className="h-[35px] absolute bg-zinc-500 bg-opacity-10 rounded-lg pl-10 p-2 inline-flex w-full focus:outline-none"
                placeholder={`Buscar establecimiento`}
                onChange={(e) => handleSearch(e.target.value)}
                onClick={(e) => handleSearch(e.target.value)}
              />
              <div className="mt-10">
                {recentSearches.map((term, index) => (
                  <div
                    key={index}
                    className="flex cursor-pointer"
                    onClick={() => handleRecentSearch(term)}
                  >
                    <p>{term}</p>
                  </div>
                ))}
              </div>
              <div className="mt-[0%]">
                {businesses.map((business) => (
                  <div key={business._id_business}>
                    <div
                      onClick={() => handleBusinessClick(business)}
                      className="flex cursor-pointer"
                    >
                      <h2 className="mr-3">{business.name},</h2>
                      <p>{business.city}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-[0%]">
                {searchUser.map((users) => (
                  <div key={users._id_user}>
                    <div
                      onClick={() => handleUserClick(users)}
                      className="flex cursor-pointer"
                    >
                      <h2 className="mr-3">{users.name},</h2>
                      <p>{users.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex ml-3 mt-4">
              <button
                className={`${
                  activeTabView === "parati"
                    ? darkMode
                      ? "active-parati"
                      : ""
                    : ""
                } mr-7`}
                onClick={() => setActiveTabView("parati")}
              >
                <p
                  className={`${darkMode ? "dark-text-white" : ""} ${
                    activeTabView === "parati"
                      ? "font-bold"
                      : "font-bold text-opacity-60"
                  } ml-1 mb-2`}
                >
                  Para ti
                </p>
                {activeTabView === "parati" && (
                  <div className="tab-indicator" />
                )}
              </button>
              <button
                className={`${
                  activeTabView === "tendencias"
                    ? darkMode
                      ? "active-tendencias"
                      : ""
                    : ""
                } mr-7`}
                onClick={() => setActiveTabView("tendencias")}
              >
                <p
                  className={`${darkMode ? "dark-text-white" : ""} ${
                    activeTabView === "tendencias"
                      ? "font-bold"
                      : "font-bold text-opacity-60"
                  } mb-2`}
                >
                  Tendencias
                </p>
                {activeTabView === "tendencias" && (
                  <div className="tab-indicator" />
                )}
              </button>
              <button
                className={`${
                  activeTabView === "noticias"
                    ? darkMode
                      ? "active-noticias"
                      : ""
                    : ""
                } mr-7`}
                onClick={() => setActiveTabView("noticias")}
              >
                <p
                  className={`${darkMode ? "dark-text-white" : ""} ${
                    activeTabView === "noticias"
                      ? "font-bold"
                      : "font-bold text-opacity-60"
                  } mb-2`}
                >
                  Noticias
                </p>
                {activeTabView === "noticias" && (
                  <div className="tab-indicator" />
                )}
              </button>
              <button
                className={
                  activeTabView === "empresas"
                    ? darkMode
                      ? "active-empresas"
                      : ""
                    : ""
                }
                onClick={() => setActiveTabView("empresas")}
              >
                <p
                  className={`${darkMode ? "dark-text-white" : ""} ${
                    activeTabView === "empresas"
                      ? "font-bold"
                      : "font-bold text-opacity-60"
                  } mb-2`}
                >
                  Empresas
                </p>
                {activeTabView === "empresas" && (
                  <div className="tab-indicator" />
                )}
              </button>
            </div>
          </div>
      </div>
      <div
        className={`bg-[#FFF] w-[100%] h-[6%] flex bottombar ${
          darkMode ? "dark-bg" : ""
        }`}
      >
        <div className="flex justify-around items-center mt-3">
          <i
            class={`fa-solid fa-house ${
              darkMode ? "dark-text-white" : ""
            } text-[130%] iconeres`}
            onClick={() => navigate("/home")}
          ></i>
          <i
            class={`fa-solid fa-magnifying-glass ${
              darkMode ? "dark-text-white" : ""
            } text-[130%] iconeres`}
            onClick={() => navigate("/search")}
          ></i>
          <i
            class={`fa-solid fa-message ${
              darkMode ? "dark-text-white" : ""
            } text-[130%] iconeres`}
            onClick={() => navigate("/chats")}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Home;
