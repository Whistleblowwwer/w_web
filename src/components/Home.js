import React, { useState, useEffect } from "react";
import proSet from "../assets/Image-40.png";
import { useNavigate } from "react-router-dom";
import NewPostModal from "../auxComponents/NewPostModal";
import NewCommentModal from "../auxComponents/NewCommentModal";
import NewCompanyModal from "../auxComponents/NewCompanyModal";

import { getHeaders, uploadFiles } from "../utils";
import Sidebar from "../auxComponents/Sidebar";
import MainSection from "../auxComponents/MainSection";
import Searchbar from "../auxComponents/Searchbar";
import BottomNavbar from "../auxComponents/BottomNavbar";

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

  const headers = getHeaders(); //SUGIERO USAR ESTA VARIABLE PARA LOS HEADERS

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

  useEffect(() => {
    async function verifyToken() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://3.135.121.50:4000/users/token",
          requestOptions
        );
        const parseRes = await response.json();
        console.log(parseRes);

        if (!parseRes.success && parseRes.message === "Invalid token") {
          // Borra los elementos del localStorage
          localStorage.removeItem("client_password");
          localStorage.removeItem("recentSearches");
          localStorage.removeItem("client_email");
          localStorage.removeItem("token");
          setAuth(false);
        }
      } catch (err) {
        console.error(err.message);
      }
    }

    verifyToken();
  }, []);

  const handleAddPost = async () => {
    if (textPost && selectedImages.length > 0) {
      const newPost = {
        text: textPost,
        images: selectedImages.map((file) => URL.createObjectURL(file)),
      };

      try {
        const data = await uploadFiles(
          `ENDPOINT?id_review=ID_REVIEW`,
          headers,
          selectedImages
        );

        console.log(data);
      } catch (error) {
        console.error("Error al subir los archivos:", error);
      }

      // AQUI SUPONGO QUE IRA EL CONSUMO DEL ENDPOINT DE LA CREACION DEL POST CON IMAGENES

      // setPostes([newPost, ...postes]);
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
                likesCount: prevPost.is_liked
                  ? prevPost.likesCount - 1
                  : prevPost.likesCount + 1,
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

  useEffect(() => {
    const storedRecentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  return (
    <main
      className={`bg-[#EEEFEF] w-full flex gap-1 ${
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
          selectedImages={selectedImages}
          setShowPublishIcon={setShowPublishIcon}
          addPost={handleAddPost}
          suggestions={suggestions}
          setSelectedCompany={setSelectedCompany}
          companySearchQuery={companySearchQuery}
          setCompanySearchQuery={setCompanySearchQuery}
          handleRatingClick={handleRatingClick}
          reviewRating={reviewRating}
          handleSearchCompanyClick={handleSearchCompanyClick}
          setCompanyModalOpen={() => setCompanyModalOpen(true)}
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
      <Sidebar
        darkMode={darkMode}
        handlePostModal={handlePostModal}
        handleUserClick={() => handleUserClick(name)}
        username={name.name}
      />
      <MainSection
        darkMode={darkMode}
        handleTextChange2={handleTextChange2}
        textPost={textPost}
        maxLength={maxLength}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        setCompanyModalOpen={() => setCompanyModalOpen(true)}
        handleSearchCompanyClick={handleSearchCompanyClick}
        suggestions={suggestions}
        setSelectedCompany={setSelectedCompany}
        companySearchQuery={companySearchQuery}
        setCompanySearchQuery={setCompanySearchQuery}
        reviewRating={reviewRating}
        handleRatingClick={handleRatingClick}
        showPublishIcon={showPublishIcon}
        handleAddPost={handleAddPost}
        postes={postes}
        handleBusinessClick={handleBusinessClick}
        handleUserClick={handleUserClick}
        handleReview={handleReview}
        handleLike={handleLike}
        handleCommentClick={handleCommentClick}
      />
      <Searchbar
        darkMode={darkMode}
        activeTabView={activeTabView}
        businesses={businesses}
        handleBusinessClick={handleBusinessClick}
        handleRecentSearch={handleRecentSearch}
        handleSearch={handleSearch}
        handleUserClick={handleUserClick}
        recentSearches={recentSearches}
        search={search}
        searchUser={searchUser}
        setActiveTabView={setActiveTabView}
      />
      <BottomNavbar darkMode={darkMode} />
    </main>
  );
};

export default Home;
