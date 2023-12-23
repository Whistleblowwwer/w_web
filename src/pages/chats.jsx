import { useState, useEffect } from "react";
import logoN from "../assets/NavLogo.png";
import proSet from "../assets/Image-40.png";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import ChatList from "../components/ChatList";
import { io } from "socket.io-client";
import Conversation from "../components/Conversation";

const socket = io("http://3.18.112.92:4000", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWRfdXNlciI6ImQzZWQxZTA0LTFjOTgtNDYzMy05YzYyLWRmY2NlMWRhMDU5YSIsImlhdCI6MTcwMzE5NTEyMCwiZXhwIjoxNzAzNDU0MzIwfQ.9AlhqHI68lNjLzJPRd06Sv-VkW2XcGv_CoQ82d5i3uA",
  },
  transports: ["websocket"],
});

export default function Chats(darkMode) {
  const [userId, setUserId] = useState();
  const [chatsList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [currentConversation, setCurrentConversation] = useState(undefined);
  const [message, setMessage] = useState("");

  console.log("messages", currentConversation);
  // console.log("sender", selectedChat?.Sender._id_user);
  // console.log("receiver", selectedChat?.Receiver._id_user);

  socket.on("newMessage", (message) => {
    console.log("message response: ", message);
    setCurrentConversation([...currentConversation, message]);
  });

  const handleSendMessage = () => {
    const messageData = {
      content: message,
      _id_sender:
        selectedChat.Sender._id_user == userId
          ? selectedChat.Sender._id_user
          : selectedChat.Receiver._id_user,
      _id_receiver:
        selectedChat.Sender._id_user == userId
          ? selectedChat.Receiver._id_user
          : selectedChat.Sender._id_user,
    };
    socket.emit("sendMessage", messageData);
    setMessage("");
  };

  useEffect(() => {
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
        setUserId(parseRes?.user._id_user);
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

  return (
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
                  userId={userId}
                />
              )}
            </div>
          </div>
          <div className="bg-[#141414] w-[1px]" />
          <div className="w-[77%] justify-center items-center chat-container">
            {selectedChat == undefined ? (
              <p className="text-neutral-900 text-[25px] font-semibold leading-normal">
                No hay ningún chat seleccionado
              </p>
            ) : (
              <Conversation
                messages={currentConversation}
                userId={userId}
                message={message}
                setMessage={setMessage}
                handleSendMessage={handleSendMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
    // <div className="h-screen lg:w-[80%] w-full flex justify-center items-center">
    //   Proximamente
    //   <ChatList />
    // </div>
  );
}
