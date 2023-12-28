import { React, useRef, useEffect } from "react";
import sendMessage from "../assets/SendMessage.svg";

function Conversation(props) {
  const sender = props.userId;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const handleSendMessage = () => {
    props.handleSendMessage();
    scrollToBottom();
  };

  return (
    <div className="conversation-container">
      <div className="flex justify-center pt-2 fixed w-[100%] top-0 left-[19%] ">
        <p className="text-zinc-900 text-xl font-medium leading-[18.62px]">
          {props?.userName}
        </p>
      </div>
      <div className="messages">
        {props.messages && props.messages.length > 0 ? (
          props.messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message._id_sender === props.userId ? "sent" : "received"}`}
            >
              {message.content}
            </div>
          ))
        ) : (
          <p className="flex justify-center text-gray-600	">Iniciar conversacion</p>

        )}
        <div ref={messagesEndRef}></div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={props.message}
            onChange={(e) => props.setMessage(e.target.value)}
          />
          <button onClick={() => handleSendMessage()}>
            <span className="relative right-0 pl-3 flex items-center">
              <i className="fas fa-search text-gray-700"></i>
            </span>
          </button>
        </div>
      </div>
    </div>

  );
}

export default Conversation;