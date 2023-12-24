import { React, useEffect, useState } from "react";
import { io } from "socket.io-client";
import proSet from "../assets/Image-40.png";

function ChatList(props) {
  const handleChatClick = (chat) => {
    props.setSelectedChat(chat);
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
          props.userId == chat?.Receiver._id_user
            ? `http://3.18.112.92:4000/messages/?_id_receiver=${chat?.Sender._id_user}`
            : `http://3.18.112.92:4000/messages/?_id_receiver=${chat?.Receiver._id_user}`;
        const response = await fetch(messagesURL, requestOptions);
        const parseRes = await response.json();
        let invertedConversationArray = parseRes?.messages;
        invertedConversationArray = [...invertedConversationArray].reverse();
        props.setCurrentConversation(invertedConversationArray);
      } catch (err) {
        console.error(err.message);
      }
    }

    getMessages();
  };

  useEffect(() => {
    props.socket.on("connect", () => {
      console.log("Conectado al servidor");
    });
  }, []);

  return (
    <div>
      {props.chatsList &&
        props.chatsList.map((chat, index) => (
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
                {props.userId == chat?.Receiver._id_user
                  ? `${chat?.Sender.name} ${chat?.Sender.last_name}`
                  : `${chat?.Receiver.name} ${chat?.Receiver.last_name}`}
              </p>
              <p>{chat?.Message.content}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChatList;