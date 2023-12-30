import { React, useRef, useEffect } from "react";
import sendMessage from "../assets/enviar-mensaje-removebg-preview.png";

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
    <div>
      <div className="conversation-container">
        <div className="flex justify-center fixed w-[100%] top-0 left-[19%]">
          <p className="text-zinc-900 text-center p-2 text-xl font-medium leading-[18.62px] h-10 w-[66%] translate-x-[6%]" style={{ backgroundColor: 'rgba(169, 169, 169, 0.06)' }}>
            {props?.userName}
          </p>
        </div>
        <div className="messages mt-4">
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
              onChange={(e) => props.setMessage(e.target.value)} // Agrega esta clase para hacer el input más redondo
            />
            <button
              onClick={() => handleSendMessage()}
            >
              <img src={sendMessage} alt="send" className="translate-x-[-60%]" />
            </button>
          </div>
        </div>
      </div>
      <div className="conversation-response">
        <div className="fixed w-[100%] top-[9%] z-10000">
          <span className="absolute mt-2 ml-2" onClick={props.handleChatVisible}><i class="fa-solid fa-arrow-left"></i></span>
          <p className="flex justify-center text-zinc-900 text-center p-2 text-xl font-medium leading-[18.62px] h-10 w-[100%] " style={{ backgroundColor: 'rgba(169, 169, 169, 0.06)' }}>
            {props?.userName}
          </p>
        </div>
        <div className="messages mt-6">
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
            <button
              onClick={() => handleSendMessage()}
            >
              <img src={sendMessage} alt="send" className="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;