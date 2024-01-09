import mas from "../assets/Group 99.svg";
import AddFiles from "./AddFiles";
import CompanyAutocomplete from "./CompanyAutocomplete";

import PostCard from "./PostCard";

const MainSection = ({
  darkMode,
  handleTextChange2,
  textPost,
  maxLength,
  selectedImages,
  setSelectedImages,
  setCompanyModalOpen,
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
}) => {
  return (
    <div className="lg:w-[50%] w-full bg-[#EEEFEF] lg:px-0 p-1">
      {postes === undefined ? (
        <div className="flex items-center justify-center h-[100%]  bg-[#EEEFEF] lg:px-0 p-1">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={`bg-[#FFF] flex flex-col ${
              darkMode ? "dark-register-bg" : ""
            }`}
          >
            <input
              className={`input-style w-full rounded-lg bg-gray-50 p-4 ${
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
              <AddFiles
                darkMode={darkMode}
                selectedFiles={selectedImages}
                setSelectedFiles={setSelectedImages}
                isInHome={true}
              />
              <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4">
                <div className="flex gap-2 w-full lg:w-1/2">
                  <img
                    src={mas}
                    alt="mas"
                    className="w-[38px] relative cursor-pointer"
                    onClick={() => setCompanyModalOpen(true)}
                  />
                  <div
                    className="relative lg:w-2/3 w-full"
                    onClick={handleSearchCompanyClick}
                  >
                    <CompanyAutocomplete
                      suggestions={suggestions}
                      setSelectedCompany={setSelectedCompany}
                      companySearchQuery={companySearchQuery}
                      setCompanySearchQuery={setCompanySearchQuery}
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between w-full lg:w-1/2">
                  <div className="flex items-center relative gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fa-solid fa-star ${
                          star <= reviewRating ? "dark-text-white" : ""
                        }`}
                        style={{
                          color: star <= reviewRating ? "#688BFF" : "#D9D9D9",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRatingClick(star)}
                      ></i>
                    ))}
                  </div>
                  <button
                    style={{
                      display: showPublishIcon ? "none" : "block",
                      background: showPublishIcon
                        ? "linear-gradient(267deg, #8E1DA1 0%, #2D015A 100%)"
                        : "#F8F8FB",
                    }}
                    className={`bg-[#F8F8FB] w-[45%] h-[42px] rounded-full ${
                      darkMode ? "dark-button" : ""
                    }`}
                  >
                    <p
                      className={`text-[#A9A9A9] text-md ${
                        darkMode ? "dark-text" : ""
                      }`}
                    >
                      Publicar
                    </p>
                  </button>
                  <button
                    onClick={handleAddPost}
                    style={{
                      display: showPublishIcon ? "block" : "none",
                      background: showPublishIcon
                        ? "linear-gradient(267deg, #8E1DA1 0%, #2D015A 100%)"
                        : "#F8F8FB",
                    }}
                    className={`bg-[#F8F8FB] w-[45%] h-[42px] rounded-full ${
                      darkMode ? "dark-button" : ""
                    }`}
                  >
                    <p
                      className={`text-[#FFF] text-md ${
                        darkMode ? "dark-text" : ""
                      }`}
                    >
                      Publicar
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-1 lg:pb-0">
            {postes?.map((post, index) => (
              <PostCard
                key={index}
                post={post}
                darkMode={darkMode}
                handleBusinessClick={handleBusinessClick}
                handleCommentClick={handleCommentClick}
                handleLike={handleLike}
                handleReview={handleReview}
                handleUserClick={handleUserClick}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSection;
