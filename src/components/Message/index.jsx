import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Message = () => {
  const reactNode = (
    <div className="message">
      <p>长按保存图片哦～</p>
    </div>
  );
  return ReactDOM.createPortal(reactNode, document.body);
};

export default Message;
