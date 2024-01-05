import { redirect, useLocation, useNavigate } from "react-router-dom";
import { uploadFiles } from "../utils";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

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
import differenceInCalendarQuarters from "date-fns/esm/fp/differenceInCalendarQuarters/index.js";
import NewDeleteModal from "../components/NewReportModal";

const AppProvider = ({ children, darkMode, FunctionContext, token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnamesToHide = [
    "/register",
    "/login",
    "/admin",
    "/t&c",
    "/aviso-privacidad",
  ];
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
  const [isCommentingReview, setIsCommentingReview] = useState(undefined);
  const [idReview, setIdReview] = useState("");

  //general variables
  const [isTyping, setIsTyping] = useState(false);
  const [activeFeed, setActiveFeed] = useState("feed");
  const [activeTabView, setActiveTabView] = useState("parati");
  const [showPublishIcon, setShowPublishIcon] = useState(false);
  const [name, setName] = useState("");
  const [postes, setPostes] = useState(undefined);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [reviewRating, setReviewRating] = useState(0);
  const [companySearchQuery, setCompanySearchQuery] = useState("");
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    name: "",
    address: "default-adress",
    entity: "",
    country: "",
    iso2_country_code: "",
    state: "",
    iso2_state_code: "",
    city: "",
    category: "",
  });
  const [fetchResultHandler, setFetchResultHandler] = useState({
    error: undefined,
    message: undefined,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({
    isUserProfile: false,
    isComment: false,
  });
  const [tokenVerified, setTokenVerified] = useState(false);

  useEffect(() => {
    // Initialize pageReloaded in localStorage if not present
    if (localStorage.getItem("pageReloaded") === null) {
      localStorage.setItem("pageReloaded", "false");
    }

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
          "https://api.whistleblowwer.net/users/token",
          requestOptions
        );
        await response.json().then((result) => {
          if (result?.success === false) {
            if (localStorage.token !== undefined) {
              // Borra los elementos del localStorage
              localStorage.removeItem("client_password");
              localStorage.removeItem("recentSearches");
              localStorage.removeItem("client_email");
              localStorage.removeItem("token");
              localStorage.removeItem("validCredentials");
              if (
                !(
                  location.pathname === "/t&c" ||
                  location.pathname === "/aviso-privacidad"
                )
              ) {
                navigate("/login");
              }
            } else {
              let i = 0;
              const intervalId = setInterval(() => {
                if (localStorage.token !== undefined || i >= 10) {
                  clearInterval(intervalId);
                  if (localStorage.token !== undefined) {
                    getName();
                    getPostes();
                  }
                }
                i++;
              }, 1000);
            }
          } else {
            // Token válido, recarga la página solo una vez para cargar la información del usuario
            if (!pageReloaded && !localStorage.getItem("validCredentials")) {
              localStorage.setItem("validCredentials", true);
              window.location.reload();
              setPageReloaded(true);
              localStorage.setItem("pageReloaded", "true");
            } else {
              console.log("error here!");
              getName();
              getPostes();
            }
          }
        });
        setTokenVerified(true);
      } catch (err) {
        window.location.reload();
        console.log(err);
      }
    }
    verifyToken();
  }, [localStorage.token]);

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

  const handleDeleteModal = () => {};
  const handleDeleteClick = (isUserProfile, isComment) => {
    setDeleteModalOpen(!deleteModalOpen);
    setDeleteModalData({
      ...deleteModalData,
      isUserProfile: isUserProfile,
      isComment: isComment,
    });
  };

  const handleRecentSearch = async (searchValue) => {
    navigate(`/search`, { state: { searchValue } });
  };

  const handleReview = async (reviewValue) => {
    let isComment = false;
    navigate(`/review/${reviewValue._id_review}`, {
      state: { reviewValue, isComment },
    });
  };

  const handleChildComments = async (comment) => {
    // console.log("clicked comment info:", comment);
    // async function getChildComments() {
    //   const myHeaders = new Headers();
    //   myHeaders.append("authorization", `Bearer ${localStorage.token}`);

    //   const requestOptions = {
    //     method: "GET",
    //     headers: myHeaders,
    //     redirect: "follow",
    //   };

    //   try {
    //     const response = await fetch(
    //       `https://api.whistleblowwer.net/comments/children/?_id_comment=${comment._id_comment}`,
    //       requestOptions
    //     );
    //     const parseRes = await response.json();
    //     console.log("child comments res", parseRes.comment.Comments);
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // }
    // getChildComments();
    let isComment = true;
    navigate(`/review/${comment._id_comment}`, {
      state: { comment, isComment },
    });
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
    if (textPost === "") {
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

  const handleCommentClick = (_id_review, isComment, _id_parent) => {
    if (isComment) {
      setIdReviewComment(_id_review);
      setIdReview(_id_parent);
      setIsCommentingReview(false);
      setCommentModalOpen(!commentModalOpen);
      setTextComment("");
    } else {
      setIdReviewComment(_id_review);
      setIsCommentingReview(true);
      setCommentModalOpen(!commentModalOpen);
      setTextComment("");
    }
  };

  const handleNewCommnent = () => {
    if (isCommentingReview) {
      handleCommentReview();
    } else {
      handleCommentComment();
    }
  };

  const handleTextChange2 = (event) => {
    setText(event.target.value);
    if (textPost === "") {
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
        const parseRes = await response.json();
      } catch (err) {
        console.error(err.message);
      }
    }
    postLike();
  };

  const handleCommentReview = () => {
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
        setPostes((prevPostes) => {
          return prevPostes.map((prevPost) => {
            if (prevPost._id_review === idReviewComment) {
              return {
                ...prevPost,
                commentsCount: prevPost?.commentsCount + 1,
              };
            }
            return prevPost;
          });
        });
        const response = await fetch(
          "https://api.whistleblowwer.net/comments",
          requestOptions
        );
        const validationComment = await response.json();
        if (validationComment.message === "Comment created successfully") {
          toast.success("Comentario enviado");

          // TO-DO: elminar este if, mejorar logica para no tener que recargar pagina
          const currentUrl = window.location.href;
          if (currentUrl.includes("/review")) {
            window.location.reload();
          }
        }
      } catch (err) {
        console.error(err.message);
      }
    }
    setCommentModalOpen(!commentModalOpen);
    postComment();
  };

  const handleCommentComment = () => {
    async function postComment() {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);

      var raw = JSON.stringify({
        content: textComment,
        _id_review: idReview,
        _id_parent: idReviewComment,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        setPostes((prevPostes) => {
          return prevPostes.map((prevPost) => {
            if (prevPost._id_review === idReviewComment) {
              return {
                ...prevPost,
                commentsCount: prevPost?.commentsCount + 1,
              };
            }
            return prevPost;
          });
        });
        const response = await fetch(
          "https://api.whistleblowwer.net/comments",
          requestOptions
        );
        const validationComment = await response.json();
        if (validationComment.message === "Comment created successfully") {
          toast.success("Comentario enviado");
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
        setSelectedCompany(parseRes?.business._id_business);
        setCompanySearchQuery(companyForm.name);
        setCompanyModalOpen(false);
      } catch (err) {
        console.error(err.message);
      }
    }
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

  useEffect(() => {
    if (
      textPost !== "" &&
      reviewRating > 0 &&
      (selectedCompany !== undefined || selectedCompany === "")
    ) {
      setShowPublishIcon(true);
    } else {
      setShowPublishIcon(false);
    }
  }, [textPost, reviewRating, selectedCompany]);

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

  async function getName() {
    const myHeaders = new Headers();
    if (localStorage.token === null || localStorage.token === undefined) {
      // Manejar el error aquí, por ejemplo, redirigir al usuario a la página de inicio de sesión
      console.error("No hay token en localStorage");
      // Puedes redirigir al usuario o realizar otra acción
      return;
    } else {
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
  }

  async function getPostes() {
    const token = localStorage.token;

    if (!token) {
      console.error("No hay token en localStorage");
      navigate("/login");
      return;
    }

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
        window.location.reload();
        // Puedes redirigir al usuario a la página de inicio de sesión
        return;
      }

      const parseRes = await response.json();
      setPostes(parseRes.reviews);
    } catch (err) {
      console.error(err.message);
    }
  }

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
    handleChildComments,
    handleLike,
    handleCommentClick,
    handleCommentComment,
    handleCommentReview,
    handleNewUpdateProfileModal,
    handleDeleteClick,
  };

  return (
    <>
      {tokenVerified === true ? (
        <>
          {deleteModalOpen && (
            <NewDeleteModal
              handleDeleteModal={handleDeleteModal}
              handleDeleteClick={handleDeleteClick}
            />
          )}
          {postModalOpen && (
            <NewPostModal
              handlePostModal={handlePostModal}
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
              addComment={handleNewCommnent}
              isReview={isCommentingReview}
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
              fetchResultHandler={fetchResultHandler}
              setFetchResultHandler={setFetchResultHandler}
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
      ) : (
        <div className="flex items-center justify-center h-screen w-screen">
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
      )}
    </>
  );
};

export default AppProvider;
