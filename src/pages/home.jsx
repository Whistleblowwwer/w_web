import { useContext, useEffect, useState } from "react";
import { MainSection } from "../components";

export default function Home({ setAuth, darkMode, FunctionContext }) {
  const {
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
    handleDeleteClick,
  } = useContext(FunctionContext);
  const [pageReloaded, setPageReloaded] = useState(false);

  useEffect(() => {
    // async function verifyToken() {
    //   const myHeaders = new Headers();
    //   myHeaders.append("authorization", `Bearer ${localStorage.token}`);
    //   const requestOptions = {
    //     method: "GET",
    //     headers: myHeaders,
    //     redirect: "follow",
    //   };
    //   try {
    //     const response = await fetch(
    //       "https://api.whistleblowwer.net/users/token",
    //       requestOptions
    //     );
    //     const parseRes = await response.json();
    //     if (!parseRes.success && parseRes.message === "Invalid token") {
    //       // Borra los elementos del localStorage
    //       localStorage.removeItem("client_password");
    //       localStorage.removeItem("recentSearches");
    //       localStorage.removeItem("client_email");
    //       localStorage.removeItem("token");
    //       setAuth(false);
    //     } else {
    //       // Token válido, recarga la página solo una vez para cargar la información del usuario
    //       if (!localStorage.getItem("validCredentials") && !pageReloaded) {
    //         localStorage.setItem("validCredentials", true);
    //         setPageReloaded(true);
    //       }
    //     }
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // }
    // verifyToken();
  }, [setAuth]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <MainSection
      darkMode={darkMode}
      handleTextChange2={handleTextChange2}
      textPost={textPost}
      maxLength={maxLength}
      selectedImages={selectedImages}
      setSelectedImages={setSelectedImages}
      setCompanyModalOpen={handleNewCompanyModal}
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
      handleDeleteClick={handleDeleteClick}
    />
  );
}
