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
      <div className="flex justify-center pt-2 fixed w-full top-0 left-[19%] ">
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
          <p>Iniciar conversacion</p>

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
            <img src={sendMessage} alt="sendmessage" />
          </button>
        </div>
      </div>
    </div>

  );
}

export default Conversation;