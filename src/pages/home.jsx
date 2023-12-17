import { useContext, useEffect } from "react";
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
  } = useContext(FunctionContext);

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
    />
  );
}
