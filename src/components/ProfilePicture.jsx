import React, { useState } from "react";
import { getHeadersBase } from "../utils/getHeaders";
import { uploadFiles } from "../utils";

const ProfilePicture = ({
  darkMode,
  userId,
  handleModalPicture,
  currentPicture,
}) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState("");
  const headersBase = getHeadersBase();

  const handleFileChange = (event) => {
    const newFile = event.target.files;

    setSelectedFile(newFile);

    setPreview(URL.createObjectURL(newFile[0]));
  };

  const handleUpload = async () => {
    try {
      const res = await uploadFiles(
        `https://api.whistleblowwer.net/bucket?id=${userId}&photo_type=users_profile_img`,
        headersBase,
        selectedFile
      );
      console.log("res", res);
    } catch (error) {
      console.error("Error al subir los archivos:", error);
    }
    setPreview("");
    setSelectedFile([]);
    handleModalPicture();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      <div
        className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] min-h-auto md:w-2/4 w-[80%] ${
          darkMode ? "dark-register-bg" : ""
        }`}
      >
        <div className="flex flex-col">
          <div className="flex justify-end mr-2">
            <button
              onClick={handleModalPicture}
              className={` ${
                darkMode ? "dark-text-white" : ""
              } hover:text-gray-500 cursor-pointer`}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <div className="rounded-full w-[202px] h-[202px] bg-[#FFF] flex justify-center items-center">
              <div className="rounded-full w-[196px] h-[196px] bg-[#D9D9D9]">
                {(currentPicture || preview) && (
                  <img
                    src={preview ? preview : currentPicture}
                    alt="profile"
                    className="rounded-full w-[196px] h-[196px] object-cover"
                  />
                )}
              </div>
            </div>
            <div className="flex w-full gap-2">
              <label
                htmlFor="imageUpload"
                className={`${
                  darkMode ? "dark-text-white" : ""
                } w-1/2 text-center px-4 py-2 rounded-lg border-2 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50`}
                style={{ fontSize: "18px", cursor: "pointer" }}
              >
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                Subir
              </label>
              <button
                className={`w-1/2 text-center px-4 py-2 rounded-lg border-2 shadow-sm text-sm font-medium ${
                  preview
                    ? "text-green-700 bg-green-100 hover:bg-green-50"
                    : "text-red-700 bg-red-100 hover:bg-red-50"
                }`}
                onClick={
                  selectedFile.length > 0 ? handleUpload : handleModalPicture
                }
                style={{ fontSize: "18px" }}
              >
                {preview ? "Guardar" : "Cancelar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
