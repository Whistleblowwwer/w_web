

import UserListAutoComplete from "./UserListAutoComplete";

function NewMessageModal(props) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      <div
      className={`z-50 bg-[#FFF] p-4 shadow-md rounded-[20px] min-h-auto md:w-2/4 w-[80%]`}>

        <div className="flex justify-between items-center">
          <h1
          className={`text-neutral-900 text-xl font-semibold leading-7 mt-2 ml-1`}>

            Nuevo mensaje{" "}
          </h1>
          <button
          // onClick={() => handleButtonClick("/admin")}
          className={`mr-4 mt-2`}>

            <i
            className="fas fa-times"
            onClick={() => props.handleCloseNewMessageModal()}>
            </i>
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex sm:flex-row flex-col items-center justify-between w-full mt-5 gap-2">
            <div className="flex gap-2 w-full">
              <div
              onClick={props.handleSearchCompanyClick}
              className="relative w-full">

                {/* reutilizando para nuevo mensaje */}
                <UserListAutoComplete
                suggestions={props.suggestions}
                usersSearchQuery={props.usersSearchQuery}
                setUsersSearchQuery={props.setUsersSearchQuery}
                setNewMessageUser={props.setNewMessageUser}
                newMessageUser={props.newMessageUser} />

              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-5">
            <button
            onClick={() => {
              props.handleNewConversation();
            }}
            className={` bg-neutral-900 rounded-[20.50px] border px-4 py-2 sm:mt-0 mt-5`}>

              <p className={`text-stone-50`}>Siguiente</p>
            </button>
          </div>
        </div>
      </div>
    </div>);

}

export default NewMessageModal;