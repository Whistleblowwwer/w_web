import React from "react";

function Conversation() {
  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.sender === "me" ? "sent" : "received"}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}

export default Conversation;
