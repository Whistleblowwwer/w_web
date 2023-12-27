import { redirect, useLocation, useNavigate } from "react-router-dom";
import { uploadFiles } from "../utils";
import { useEffect, useState } from "react";

import {
  Sidebar,
  Searchbar,
  BottomNavbar,
  NewCommentModal,
  NewCompanyModal,
  NewPostModal,
  UpdateProfileModal,
  Navbar,
} from "../components";
import { getHeadersBase } from "../utils/getHeaders";

const AppProvider = ({ children, darkMode, FunctionContext, token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnamesToHide = ["/", "/register", "/login", "/admin"];
  const shouldHideComponent = pathnamesToHide.includes(location.pathname);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

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
    iso2_country_code: "",
    state: "",
    iso2_state_code: "",
    city: "",
    category: "",
  });
  useEffect(() => {
    // Initialize pageReloaded in localStorage if not present
    if (localStorage.getItem("pageReloaded") === null) {
      localStorage.setItem("pageReloaded", "false");
    }
  }, []);
  const [pageReloaded, setPageReloaded] = useState(() => {
    return localStorage.getItem("pageReloaded") === "true" || false;
  });
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

  const handleNewUpdateProfileModal = () => {
    setUpdateModalOpen(!updateModalOpen);
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
          `https://api.whistleblowwer.net/business/search?name=${e}&city=&enitty=&country=&address=&state=`,
          requestOptions
        );
        const parseRes = await response.json();
        setBusinesses(parseRes.businesses || []);
      } catch (err) {
        console.error(err.message);
      }
      try {
        const response = await fetch(
          `https://api.whistleblowwer.net/users/search?searchTerm=${e}`,
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

  const headersBase = getHeadersBase();

  const handleAddPost = async () => {
    async function createReview() {
      const body = JSON.stringify({
        content: textPost,
        _id_business: selectedCompany,
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
      setPostes([jsonRes?.review, ...postes]);
      return jsonRes;
    }

    const post = await createReview();

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
          true // <- is more than one file?
        );
      } catch (error) {
        console.error("Error al subir los archivos:", error);
      }
    }
    setText("");
    setSelectedImages([]);
    setCompanySearchQuery("");
    setReviewRating(0);
    setPostModalOpen(false);
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
        const url = `https://api.whistleblowwer.net/users/reviews/like/?_id_review=${_id_review}`;
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
          "https://api.whistleblowwer.net/comments",
          requestOptions
        );
        const validationComment = await response.json();
        if (validationComment.message === "Comment created successfully") {
          window.location.reload();
        }
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
          "https://api.whistleblowwer.net/business",
          requestOptions
        );
        const parseRes = await response.json();
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
          "https://api.whistleblowwer.net/business/search?",
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
    const { name, value } = e.target;
    setCompanyForm((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleCountryChangeInForm = (name, iso2) => {
    setCompanyForm((prevFormulario) => ({
      ...prevFormulario,
      country: name,
      iso2_country_code: iso2,
    }));
  };

  const handleCategoryChangeInForm = (name) => {
    setCompanyForm((prevFormulario) => ({
      ...prevFormulario,
      category: name,
    }));
  };

  const handleStateChangeInForm = (name, iso2) => {
    setCompanyForm((prevFormulario) => ({
      ...prevFormulario,
      state: name,
      iso2_state_code: iso2,
    }));
  };

  const handleCityChangeInForm = (name) => {
    setCompanyForm((prevFormulario) => ({
      ...prevFormulario,
      city: name,
    }));
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleSubmitCompany = (e) => {
    e.preventDefault();
    setCompanyModalOpen(false);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    setUpdateModalOpen(false);
  };

  console.log("page reload", pageReloaded);
  async function verifyToken() {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.whistleblowwer.net/users/token",
        requestOptions
      );
      const parseRes = await response.json();

      if (!parseRes.success && parseRes.message === "Invalid token") {
        // Borra los elementos del localStorage
        localStorage.removeItem("client_password");
        localStorage.removeItem("recentSearches");
        localStorage.removeItem("client_email");
        localStorage.removeItem("token");
      } else {
        // Token válido, recarga la página solo una vez para cargar la información del usuario
        if (!pageReloaded) {
          localStorage.setItem("validCredentials", true);
          setPageReloaded(true);
          localStorage.setItem("pageReloaded", "true");
          window.location.reload();
        }
        console.log("correct token");
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getName() {
    const myHeaders = new Headers();
    const token = localStorage.token;
    if (!token) {
      // Manejar el error aquí, por ejemplo, redirigir al usuario a la página de inicio de sesión
      console.error("No hay token en localStorage");
      // Puedes redirigir al usuario o realizar otra acción
      return;
    }
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
      setUpdateForm(parseRes.user);
      setName(parseRes.user);
      localStorage.setItem("userName", JSON.stringify(parseRes.user.name));
      localStorage.setItem("userId", JSON.stringify(parseRes.user._id_user));
    } catch (err) {
      console.error(err.message);
    }
  }

  console.log("token prop", token);
  useEffect(() => {
    // Use an async IIFE to be able to use await inside useEffect
    (async () => {
      console.log("enter!");
      await verifyToken();
      if (localStorage.token) {
        await getName();
      } else {
        navigate("/login");
      }
    })();
  }, [token]);

  useEffect(() => {
    async function getPostes() {
      const token = localStorage.token;

      if (!token) {
        console.error("No hay token en localStorage");
        // Puedes redirigir al usuario o realizar otra acción
        return;
      }

      // Verificar el token antes de hacer la solicitud
      await verifyToken();

      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "https://api.whistleblowwer.net/reviews/",
          requestOptions
        );

        if (response.status === 401) {
          // Manejar el error de autorización
          console.error("Error de autorización");
          // Puedes redirigir al usuario a la página de inicio de sesión
          return;
        }

        const parseRes = await response.json();
        setPostes(parseRes.reviews);
      } catch (err) {
        console.error(err.message);
      }
    }

    // Llamar a getPostes solo si hay un token
    const token = localStorage.token;
    if (token) {
      getPostes();
    }
  }, [setPostes]);

  const [updateForm, setUpdateForm] = useState({
    name: name.name,
    last_name: name.last_name,
    phone_number: name.phone_number,
    email: name.email,
    nick_name: name.nick_name,
  });

  const handleUpdateProfile = () => {
    async function updateProfile() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(updateForm),
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://api.whistleblowwer.net/users?_id_user=${name._id_user}`,
          requestOptions
        );
        const parseRes = await response.json();
        window.location.href = "/home";
      } catch (err) {
        console.error(err.message);
      }
    }
    setUpdateModalOpen(!updateModalOpen);
    updateProfile();
  };

  useEffect(() => {
    const storedRecentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  const generalFunctions = {
    handleTextChange2,
    textPost,
    maxLength,
    selectedImages,
    setSelectedImages,
    handleNewCompanyModal,
    handleSearchCompanyClick,
    suggestions,
    setSelectedCompany,
    companySearchQuery,
    setCompanySearchQuery,
    reviewRating,
    handleRatingClick,
    showPublishIcon,
    handleAddPost,
    postes,
    handleBusinessClick,
    handleUserClick,
    handleReview,
    handleLike,
    handleCommentClick,
    handleNewUpdateProfileModal,
  };

  return (
    <>
      {postModalOpen && (
        <NewPostModal
          handlePostModal={handlePostModal}
          darkMode={darkMode}
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
          handleCountrySelect={handleCountryChangeInForm}
          handleStateSelect={handleStateChangeInForm}
          handleCitySelect={handleCityChangeInForm}
          handleCategorySelect={handleCategoryChangeInForm}
        />
      )}
      {updateModalOpen && (
        <UpdateProfileModal
          handleNewUpdateProfileModal={handleNewUpdateProfileModal}
          handleSubmit={handleSubmitUpdate}
          handleChange={handleChangeUpdate}
          darkMode={darkMode}
          name={updateForm.name}
          last_name={updateForm.last_name}
          phone_number={updateForm.phone_number}
          email={updateForm.email}
          nick_name={updateForm.nick_name}
          handleUpdate={handleUpdateProfile}
        />
      )}
      {!shouldHideComponent && (
        <>
          <Navbar
            darkMode={darkMode}
            handleUserClick={() => handleUserClick(name)}
          />
          <Sidebar
            darkMode={darkMode}
            handlePostModal={handlePostModal}
            handleUserClick={() => handleUserClick(name)}
            handleNewCompanyModal={handleNewCompanyModal}
            user={name}
          />
        </>
      )}
      {location.pathname === "/search" ? (
        <>
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
          <FunctionContext.Provider value={generalFunctions}>
            {children}
          </FunctionContext.Provider>
          <BottomNavbar darkMode={darkMode} />
        </>
      ) : (
        <>
          <FunctionContext.Provider value={generalFunctions}>
            {children}
          </FunctionContext.Provider>
          {!shouldHideComponent && (
            <>
              {location.pathname !== "/chats" && (
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
              )}
              <BottomNavbar darkMode={darkMode} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default AppProvider;
