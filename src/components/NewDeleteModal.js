import React from "react";

function NewDeleteModal(props) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      <div
        className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] min-h-auto md:w-1/4 w-[80%]`}
      >
        <div className="flex flex-col">
        </div>
        {/* <div className="flex justify-left ml-4 items-center text-black text-base font-normal leading-normal">
          <button onClick={props.handleDeleteModal}>
            <p className="p-2 text-red-500" onClick={props.handleDeleteReview}>
              Eliminar
            </p>
          </button>
        </div> */}
        <div className="flex justify-left ml-4 items-center text-black text-base font-normal leading-normal">
          <button onClick={props.handleDeleteModal}>
            <p className="p-2" onClick={props.handleDeleteReview}>
              Reportar
            </p>
          </button>
        </div>
        {/* <div className="flex justify-left ml-4 items-center text-black text-base font-normal leading-normal">
          <button onClick={props.handleDeleteModal}>
            <p className="p-2" onClick={props.handleDeleteReview}>
              Seguir usuario
            </p>
          </button>
        </div> */}
        <div className="flex justify-left ml-4 items-center text-black text-base font-normal leading-normal">
          <button onClick={props.handleDeleteClick}>
            <p className="p-2" onClick={props.handleDeleteReview}>
              Salir
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewDeleteModal;
