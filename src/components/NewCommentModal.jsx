import proSet from "../assets/defaultProfilePicture.webp";

function NewCommentModal(props) {
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
              onClick={props.handleCommentModal}
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
              className={`w-full rounded-lg bg-gray-50 p-2 min-h-[90px]  ${
                props.darkMode ? "dark-register" : ""
              }`}
              onChange={props.handleTextCommentChange}
              placeholder="Escribe algo.."
              value={props.textComment}
            />
            <div className="text-gray-500 text-sm mt-1 ml-2">
              {props.textComment.length}/{props.maxLength} palabras
            </div>
          </div>

          <div className="flex justify-end w-full mt-5">
            <button
              onClick={props.addComment}
              className={` bg-neutral-900 rounded-[20.50px] border px-4 py-2 ${
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

export default NewCommentModal;
