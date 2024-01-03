import React from 'react'

function NewDeleteModal(props) {
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
            <div
            className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] min-h-auto md:w-1/4 w-[80%]`}
            >
                <div className="text-right">
                    <button
                        onClick={props.handleDeleteModal}
                        className={`${
                        props.darkMode ? "dark-text-white" : ""
                        } hover:text-gray-500 cursor-pointer`}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className='flex mt-3 mb-3'>
                    <p className='mr-4'>¿Seguro quieres borrar esta publicacion?</p>
                    <button className='mr-2 font-bold hover:text-gray-500' onClick={props.handleDeleteReview}>Si</button>
                    <button className='font-bold hover:text-gray-500' onClick={props.handleDeleteModal}>No</button>
                </div>      
            </div>
        </div>
    )
}

export default NewDeleteModal
