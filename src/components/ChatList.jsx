import { React, useEffect, useState } from "react";
import { io } from "socket.io-client";
import proSet from "../assets/Image-40.png";

const socket = io("http://3.18.112.92:4000", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWRfdXNlciI6ImQzZWQxZTA0LTFjOTgtNDYzMy05YzYyLWRmY2NlMWRhMDU5YSIsImlhdCI6MTcwMzE5NTEyMCwiZXhwIjoxNzAzNDU0MzIwfQ.9AlhqHI68lNjLzJPRd06Sv-VkW2XcGv_CoQ82d5i3uA",
  },
  transports: ["websocket"],
});

function ChatList() {
  const [chatsList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [currentConversation, setCurrentConversation] = useState();

  console.log("Chat list", chatsList);
  console.log("selected chat", selectedChat);
  console.log("current chat", currentConversation);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    console.log(chat?.Receiver._id_user);
    async function getMessages() {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${localStorage.token}`);
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `http://3.18.112.92:4000/messages/?_id_receiver=${chat?.Receiver._id_user}`,
          requestOptions
        );
        const parseRes = await response.json();
        setCurrentConversation(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    }

    getMessages();
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor");
    });
  }, []);

  useEffect(() => {
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

    getConversations();
  }, []);

  return (
    <div>
      {chatsList &&
        chatsList.map((chat, index) => (
          <div
            key={index}
            className="flex items-center gap-2 cursor-pointer pb-2"
            onClick={() => handleChatClick(chat)}
          >
            <img
              src={
                chat?.Receiver.profile_picture_url
                  ? chat?.Receiver.profile_picture_url
                  : proSet
              }
              alt="Imagen"
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-lg">
                {`${chat?.Receiver.name} ${chat?.Receiver.last_name}`}
              </p>
              <p>{chat?.Message.content}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChatList;
