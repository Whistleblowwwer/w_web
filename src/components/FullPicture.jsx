import React from "react";

const FullPicture = ({ darkMode, picture, handleViewPicture }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      <div
        className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] h-[50%] sm:h-[70%] md:h-[70%] lg:h-[80%] w-[80%] lg:w-1/2 ${
          darkMode ? "dark-register-bg" : ""
        }`}
      >
        <div className="flex flex-col gap-2 items-center h-full">
          <div className="w-full h-[10%] flex justify-end mr-2">
            <button
              onClick={() => handleViewPicture(null)}
              className={` ${
                darkMode ? "dark-text-white" : ""
              } hover:text-gray-500 cursor-pointer`}
            >
              <i className="fa fa-times text-2xl"></i>
            </button>
          </div>
          <div className="h-[90%]">
            <img
              src={picture}
              alt="Full"
              className="object-cover rounded-[20px] w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPicture;
