import React from 'react'

function NewDeleteModal(props) {
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
                        onClick={props.handleDeleteModal}
                        className={` ${
                            props.darkMode ? "dark-text-white" : ""
                        } hover:text-gray-500 cursor-pointer`}
                        >
                        <i className="fas fa-times text-2xl"></i>
                        </button>
                    </div>
                </div>
                <div className='flex justify-center items-center text-black text-base font-normal leading-normal'>
                    <p className='p-2'>¿Deseas borrar este comentario?</p>
                    <button className='p-2 font-bold hover:text-gray-500' onClick={props.handleDeleteReview}>Si</button>
                    <button className='font-bold hover:text-gray-500' onClick={props.handleDeleteModal}>No</button>
                </div>
            </div>
        </div>
    );
}

export default NewDeleteModal
