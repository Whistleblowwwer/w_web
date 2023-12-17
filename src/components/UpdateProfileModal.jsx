function UpdateProfileModal(props) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      <div
        className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] h-[auto] w-[26%] modalres ${
          props.darkMode ? "dark-register-bg" : ""
        }`}
      >
        <div className="text-right">
          <button
            onClick={props.handleNewUpdateModal}
            className={`${
              props.darkMode ? "dark-text-white" : ""
            } hover:text-gray-500 cursor-pointer`}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form
          onSubmit={props.handleSubmit}
          className="max-w-md mx-auto mt-3 p-4 bg-white rounded shadow-md"
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
              htmlFor="last_name"
              className="block text-gray-600 font-semibold mb-2"
            >
              Apellido
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={props.last_name}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-600 font-semibold mb-2"
            >
              Numero de telefono
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={props.phoneNumber}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={props.email}
              onChange={props.handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nick_mame"
              className="block text-gray-600 font-semibold mb-2"
            >
              Nick_name
            </label>
            <input
              type="text"
              id="nick_mame"
              name="nick_mame"
              value={props.nick_mame}
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

export default UpdateProfileModal;
