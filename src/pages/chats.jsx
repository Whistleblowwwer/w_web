import { useState, useEffect } from "react";
import logoN from "../assets/NavLogo.png";
import proSet from "../assets/defaultProfilePicture.webp";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import { io } from "socket.io-client";
import Conversation from "../components/Conversation";
import NewMessageModal from "../components/NewMessageModal";

const socket = io("http://3.18.112.92:4000", {
  auth: {
    token: localStorage.token,
  },
  transports: ["websocket"],
});

export default function Chats(darkMode) {
  const location = useLocation();

  const [currentUserData, setCurrentUserData] = useState({
    name: "",
    userId: "",
  });
  const [chatsList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [currentConversation, setCurrentConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [isMessagesModalActive, setIsMessagesModalActive] = useState(false);
  const [usersSearchQuery, setUsersSearchQuery] = useState("");
  const [newMessageUser, setNewMessageUser] = useState({
    name: "",
    userId: "",
  });

  socket.on("newMessage", (message) => {
    setCurrentConversation([...currentConversation, message]);
  });

  const handleSendMessage = () => {
    const messageData = {
      content: message,
      _id_sender:
        selectedChat?.Sender?._id_user == currentUserData?.userId
          ? selectedChat?.Sender?._id_user
          : selectedChat?.Receiver?._id_user,
      _id_receiver:
        selectedChat?.Sender?._id_user == currentUserData?.userId
          ? selectedChat?.Receiver?._id_user
          : selectedChat?.Sender?._id_user,
    };
    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  const handleNewChat = () => {
    setIsMessagesModalActive(true);
    setCurrentConversation([]);
    setSelectedChat(undefined);
    async function getUsersList() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `http://3.18.112.92:4000/messages/users-list`,
          requestOptions
        );
        const parseRes = await response.json();
        setUsersList(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    }
    getUsersList();
  };

  const handleCloseNewMessageModal = () => {
    setIsMessagesModalActive(false);
  };

  const handleNewConversation = () => {
    setIsMessagesModalActive(false);
    setSelectedChat({
      Receiver: {
        _id_user: newMessageUser.userId,
        name: newMessageUser.name,
        last_name: newMessageUser.last_name,
      },
      Sender: {
        _id_user: currentUserData?.userId,
        name: currentUserData.name,
        last_name: currentUserData.last_name,
      },
    });

    let auxChatList = {
      Message: "",
      Receiver: {
        _id_user: newMessageUser.userId,
        name: newMessageUser.name,
        last_name: newMessageUser.last_name,
        profile_picture_url: newMessageUser.profile_picture_url,
      },
      Sender: {
        _id_user: currentUserData?.userId,
        name: currentUserData.name,
        last_name: currentUserData.last_name,
        profile_picture_url: currentUserData.profile_picture_url,
      },
    };

    setChatList((chatsList) => [auxChatList, ...chatsList]);

    setNewMessageUser({
      ...newMessageUser, // Preserve existing key-value pairs
      name: "",
      userId: "",
    });

    async function getMessages(auxChatList) {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const messagesURL = `http://3.18.112.92:4000/messages/?_id_receiver=${auxChatList?.Receiver._id_user}`;
        const response = await fetch(messagesURL, requestOptions);
        const parseRes = await response.json();

        let invertedConversationArray = parseRes?.messages;
        invertedConversationArray = [...invertedConversationArray].reverse();

        setCurrentConversation(invertedConversationArray);
      } catch (err) {
        setCurrentConversation([]);
        console.error(err.message);
      }
    }
    getMessages(auxChatList);
  };

  useEffect(() => {
    let auxUserId = "";
    async function getUserId() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `http://3.18.112.92:4000/users`,
          requestOptions
        );
        const parseRes = await response.json();
        setCurrentUserData({
          ...currentUserData,
          name: parseRes?.user?.name,
          lastname: parseRes?.user?.last_name,
          userId: parseRes?.user._id_user,
          profile_picture_url: parseRes?.user.profile_picture_url,
        });
        auxUserId = parseRes?.user._id_user;
      } catch (err) {
        console.error(err.message);
      }
    }

    async function getConversations() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://3.18.112.92:4000/messages/conversations",
          requestOptions
        );
        const parseRes = await response.json();
        setChatList(parseRes?.conversations);
      } catch (err) {
        console.error(err.message);
      }
    }

    getUserId();
    getConversations();
  }, []);

  useEffect(() => {
    if (location?.state?.id_user) {
      setSelectedChat({
        Receiver: {
          _id_user: location?.state?.id_user,
          name: location?.state?.name,
          last_name: location?.state?.last_name,
        },
        Sender: {
          _id_user: currentUserData?.userId,
          name: currentUserData?.name,
          last_name: currentUserData?.last_name,
        },
      });

      setChatList((chatsList) => [
        {
          Message: "",
          Receiver: {
            _id_user: location?.state?.id_user,
            name: location?.state?.name,
            last_name: location?.state?.last_name,
          },
          Sender: {
            _id_user: currentUserData?.userId,
            name: currentUserData?.name,
            last_name: currentUserData?.last_name,
          },
        },
        ...chatsList,
      ]);
      async function getMessages() {
        const myHeaders = new Headers();
        myHeaders.append("authorization", `Bearer ${localStorage.token}`);
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        try {
          const messagesURL =
            currentUserData?.userId == selectedChat?.Receiver._id_user
              ? `http://3.18.112.92:4000/messages/?_id_receiver=${selectedChat?.Sender._id_user}`
              : `http://3.18.112.92:4000/messages/?_id_receiver=${selectedChat?.Receiver._id_user}`;
          const response = await fetch(messagesURL, requestOptions);
          const parseRes = await response.json();
          let invertedConversationArray = parseRes?.messages;
          invertedConversationArray = [...invertedConversationArray].reverse();
          setCurrentConversation(invertedConversationArray);
        } catch (err) {
          console.error(err.message);
        }
      }
      getMessages();
    }
  }, [currentUserData]);

  return (
    <>
      {isMessagesModalActive && (
        <NewMessageModal
          suggestions={usersList}
          usersSearchQuery={usersSearchQuery}
          setUsersSearchQuery={setUsersSearchQuery}
          setNewMessageUser={setNewMessageUser}
          newMessageUser={newMessageUser}
          handleCloseNewMessageModal={handleCloseNewMessageModal}
          handleNewConversation={handleNewConversation}
        />
      )}
      <div className={`bg-[#EEEFEF] h-screen w-screen`}>
        <div className={`bg-[#EEEFEF] h-auto ""}`}>
          <div className="contain-principal h-screen">
            <div className="w-[25%] pt-6 pl-6">
              <div className="flex justify-between items-center">
                <p className="text-neutral-900 text-2xl font-bold leading-7">
                  Mensajes
                </p>
                <i
                  class="fa-regular fa-pen-to-square mr-7"
                  style={{ fontSize: "20px" }}
                  onClick={() => handleNewChat()}
                />
              </div>
              <div className="mt-4 flex items-center">
                <div
                  className={`relative placeholder-black p-2 w-[96%] h-[38px] bg-[#FFF] rounded-2xl`}
                >
                  <i className="p-fa fa-solid fa-magnifying-glass mr-2 ml-2 relative" />
                  <input
                    placeholder="Buscar en chats"
                    className="w-[85%] h-[120%]"
                    style={{ outline: "none", border: "none" }}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {socket && (
                  <ChatList
                    chatsList={chatsList}
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                    currentConversation={currentConversation}
                    setCurrentConversation={setCurrentConversation}
                    socket={socket}
                    userId={currentUserData?.userId}
                  />
                )}
              </div>
            </div>
            <div className="bg-[#141414] w-[1px]" />
            <div className="w-[77%] justify-center items-center overflow-y-auto">
              {selectedChat == undefined ? (
                <div className="h-full h-full flex justify-center items-center">
                  <p className="text-neutral-900 text-[25px] font-semibold leading-normal">
                    No hay ningún chat seleccionado
                  </p>
                </div>
              ) : (
                <Conversation
                  messages={currentConversation}
                  userId={currentUserData?.userId}
                  userName={
                    currentUserData?.userId == selectedChat?.Receiver._id_user
                      ? `${selectedChat?.Sender.name} ${selectedChat?.Sender.last_name}`
                      : `${selectedChat?.Receiver.name} ${selectedChat?.Receiver.last_name}`
                  }
                  message={message}
                  setMessage={setMessage}
                  handleSendMessage={handleSendMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
