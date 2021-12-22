import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Message = () => {
  const message = (
    <div className="message">
      <p>长按保存图片哦～</p>
    </div>
  );
  return ReactDOM.createPortal(message, document.body);
};

export default Message;
