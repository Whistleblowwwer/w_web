import mas from "../assets/Group 99.svg";
import AddFiles from "./AddFiles";
import proSet from "../assets/defaultProfilePicture.webp";
import CompanyAutocomplete from "./CompanyAutocomplete";

function NewPostModal(props) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      <div
        className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] min-h-auto md:w-2/4 w-[80%] ${
          props.darkMode ? "dark-register-bg" : ""
        }`}
      >
        <div className="flex flex-col">
          <div className="flex justify-end mr-2">
            <button
              onClick={props.handlePostModal}
              className={` ${
                props.darkMode ? "dark-text-white" : ""
              } hover:text-gray-500 cursor-pointer`}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <img src={proSet} alt="logo" />
            <p
              className={`text-neutral-900 text-base font-bold ${
                props.darkMode ? "dark-text-white" : ""
              }`}
            >
              <span
                className={` text-neutral-400 text-opacity-75 text-[15px] font-normal leading-[13.96px] ${
                  props.darkMode ? "dark-text-white" : ""
                }`}
              >
                Oct 25
              </span>
            </p>
          </div>

          <div className="w-full mt-5 flex flex-col ">
            <textarea
              className={`w-full rounded-lg bg-gray-50 p-2 min-h-[90px]`}
              onChange={props.handleTextChange}
              placeholder="Escribe algo.."
              value={props.textPost}
            />
            <div className="text-gray-500 text-sm mt-1 ml-2">
              {props.textPost.length}/{props.maxLength} palabras
            </div>
          </div>

          <div className="flex sm:flex-row flex-col items-center justify-between w-full mt-5 gap-2">
            <div className="flex gap-2 w-full">
              <img
                src={mas}
                alt="mas"
                className="w-[38px]"
                onClick={props.setCompanyModalOpen}
              />
              <div
                onClick={props.handleSearchCompanyClick}
                className="relative w-full"
              >
                <CompanyAutocomplete
                  suggestions={props.suggestions}
                  setSelectedCompany={props.setSelectedCompany}
                  companySearchQuery={props.companySearchQuery}
                  setCompanySearchQuery={props.setCompanySearchQuery}
                />
              </div>
            </div>
            <div className="flex items-center w-full sm:w-auto h-auto justify-end sm:!mt-0 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`fa-solid fa-star ${
                    star <= props.reviewRating ? "dark-text-white" : ""
                  }`}
                  style={{
                    color: star <= props.reviewRating ? "#688BFF" : "#D9D9D9",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                  onClick={() => props.handleRatingClick(star)}
                ></i>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-5">
            <AddFiles
              darkMode={props.darkMode}
              selectedFiles={props.selectedImages}
              setSelectedFiles={props.setSelectedImages}
            />
            <button
              onClick={props.addPost}
              className={` bg-neutral-900 rounded-[20.50px] border px-4 py-2 sm:mt-0 mt-5 ${
                props.darkMode ? "dark-button" : ""
              }`}
            >
              <p
                className={`text-stone-50 ${props.darkMode ? "dark-text" : ""}`}
              >
                Publicar
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPostModal;
