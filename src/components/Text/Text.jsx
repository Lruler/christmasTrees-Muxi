import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Text = (props) => {
  const { handleText, DrawText } = props;
  const [text, setText] = useState("");
  const inputRef = useRef();
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleCancle = () => {
    handleText(true);
  };
  const upText = () => {
    DrawText(text);
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const textNode = (
    <div className="text-container">
      <span>插入文字:</span>
      <div className="textarea-container">
        <textarea
          ref={inputRef}
          value={text}
          onChange={handleChange}
          type="text"
        />
      </div>
      <div className="feedback">
        <div className="feedback-text" onClick={upText}>
          确认
        </div>
        <div className="divide"></div>
        <div className="feedback-text" onClick={handleCancle}>
          取消
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(textNode, document.body);
};

export default Text;
