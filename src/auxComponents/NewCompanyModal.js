import React from 'react'

function NewCompanyModal(props) {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
            <div className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] h-[35%] w-[26%] modalres ${props.darkMode ? 'dark-register-bg' : ''}`}>
                <form onSubmit={props.handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
                    <div className="mb-4">
                        <label htmlFor="pais" className="block text-gray-600 font-semibold mb-2">País</label>
                        <input
                            type="text"
                            id="pais"
                            name="pais"
                            value={props.pais}
                            onChange={props.handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="estado" className="block text-gray-600 font-semibold mb-2">Estado</label>
                        <input
                            type="text"
                            id="estado"
                            name="estado"
                            value={props.estado}
                            onChange={props.handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ciudad" className="block text-gray-600 font-semibold mb-2">Ciudad</label>
                        <input
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            value={props.ciudad}
                            onChange={props.handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categoria" className="block text-gray-600 font-semibold mb-2">Categoría</label>
                        <input
                            type="text"
                            id="categoria"
                            name="categoria"
                            value={props.categoria}
                            onChange={props.handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="proyecto" className="block text-gray-600 font-semibold mb-2">Proyecto</label>
                        <input
                            type="text"
                            id="proyecto"
                            name="proyecto"
                            value={props.proyecto}
                            onChange={props.handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="empresaDesarrolladora" className="block text-gray-600 font-semibold mb-2">Empresa Desarrolladora</label>
                        <input
                            type="text"
                            id="empresaDesarrolladora"
                            name="empresaDesarrolladora"
                            value={props.empresaDesarrolladora}
                            onChange={props.handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Enviar</button>
                </form>
            </div>
        </div>

    )
}

export default NewCompanyModal