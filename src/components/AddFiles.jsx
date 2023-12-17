import { useEffect, useState } from "react";
import { renderPreviews } from "../utils";
import masimagen from "../assets/Group 105.svg";

const AddFiles = ({ darkMode, selectedFiles, setSelectedFiles, isInHome }) => {
  const [previews, setPreviews] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    setSelectedFiles([...selectedFiles, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  // const handleUpload = async () => {
  //   const headers = getHeaders();
  //   try {
  //     const data = await uploadFiles(
  //       `URL_DE_TU_ENDPOINT?id=TU_ID&photo_type=TU_PHOTO_TYPE`,
  //       headers,
  //       selectedFiles
  //     );

  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error al subir los archivos:", error);
  //   }
  // };

  const handleRemove = (index) => {
    const updatedSelectedFiles = [...selectedFiles];
    const updatedPreviews = [...previews];

    updatedSelectedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setSelectedFiles(updatedSelectedFiles);
    setPreviews(updatedPreviews);
  };

  useEffect(() => {
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [selectedFiles]);

  return (
    <div className="flex flex-row gap-2 w-full h-auto">
      <label
        htmlFor="imageUpload"
        className={`${!isInHome ? "fa-regular fa-3x fa-image" : ""} ${
          selectedFiles.length && !isInHome > 0
            ? "flex flex-col items-center gap-2"
            : ""
        } ${darkMode ? "dark-text-white" : ""}`}
        style={{ fontSize: "18px", cursor: "pointer" }}
      >
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {isInHome ? (
          <img
            src={masimagen}
            alt="masimagen"
            className="cursor-pointer w-[28px] relative"
          />
        ) : (
          <span className={`${selectedFiles.length > 0 ? "block" : "hidden"}`}>
            +
          </span>
        )}
      </label>
      <div className="flex space-x-2 overflow-x-auto md:justify-center">
        {renderPreviews(previews, hoveredIndex, setHoveredIndex, handleRemove)}
      </div>
      {/* <button
        onClick={handleUpload}
        disabled={selectedFiles.length === 0 ? true : false}
        className={
          selectedFiles.length === 0
            ? "cursor-not-allowed bg-gray-400 text-white"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }
      >
        Subir Archivos
      </button> */}
    </div>
  );
};

export default AddFiles;
