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
                        className={`${props.darkMode ? "dark-text-white" : ""
                            } hover:text-gray-500 cursor-pointer`}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className='flex flex-col mt-3 mb-4 justify-center items-center'>
                    {props.isOwnPost ?
                        (<button
                            className='font-bold hover:text-gray-500 mb-3 rounded-full w-[80%] bg-red-500 hover:bg-red-700 text-white p-3'
                            onClick={props.handleDeleteReview}
                        >
                            Eliminar
                        </button>
                        ) : (<button
                            className='font-bold hover:text-gray-500 mb-3 rounded-full w-[80%] bg-red-500 hover:bg-red-700 text-white p-3'
                            onClick={props.handleDeleteModal}
                        >
                            Envía tu reporte a reportes@whistlenlowwer.com
                        </button>
                        )
                    }
                    <button
                        className='font-bold hover:text-gray-500 rounded-full bg-black w-[80%] hover:bg-gray-800 text-white p-3'
                        onClick={props.handleDeleteModal}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewDeleteModal
