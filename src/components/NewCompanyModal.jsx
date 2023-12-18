function NewCompanyModal(props) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      <div
        className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] h-[auto] w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] modalres ${
          props.darkMode ? "dark-register-bg" : ""
        }`}
      >
        <div className="text-right">
          <button
            onClick={props.handleNewCompanyModal}
            className={`${
              props.darkMode ? "dark-text-white" : ""
            } hover:text-gray-500 cursor-pointer`}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form
          onSubmit={props.handleSubmit}
          className="max-w-md mx-auto mt-3 p-4 bg-white rounded"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 font-semibold mb-2"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={props.name}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-600 font-semibold mb-2"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={props.address}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="entity"
              className="block text-gray-600 font-semibold mb-2"
            >
              Entidad
            </label>
            <input
              type="text"
              id="entity"
              name="entity"
              value={props.entity}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-600 font-semibold mb-2"
            >
              Pais
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={props.country}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-600 font-semibold mb-2"
            >
              Estado
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={props.state}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-600 font-semibold mb-2"
            >
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={props.city}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-600 font-semibold mb-2"
            >
              Categoria
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={props.category}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            onClick={props.handleCreateBusiness}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewCompanyModal;
