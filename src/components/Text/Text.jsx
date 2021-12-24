import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { SliderPicker } from "react-color";
import "./index.css";

const Text = (props) => {
  const { handleText, DrawText, step, handleFontStyle, fontStyle } = props;
  const [text, setText] = useState("");
  const [color, setColor] = useState("#fff");
  const onChangeColor = (colorObj) => {
    setColor(colorObj.hex);
  };
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
  const choiceFamily = (family) => {
    handleFontStyle(family);
  };
  const handleColor = (color) => {
    handleFontStyle(color);
  };
  useEffect(() => {
    if (step === 2) inputRef.current.focus();
  }, [step]);

  const textFamily = (
    <div className="text-container">
      <span>文字字体:</span>
      <div className="family-container">
        <div className="family1" onClick={() => choiceFamily("ZCOOL KuaiLe")}>
          木犀团队
        </div>
        <div className="divide"></div>
        <div className="family2" onClick={() => choiceFamily("Zhi Mang Xing")}>
          木犀团队
        </div>
      </div>
    </div>
  );
  const textNode = (
    <div className="text-container">
      <span>插入文字:</span>
      <div className="textarea-container">
        <textarea
          ref={inputRef}
          value={text}
          className={
            fontStyle ? "textFamily" + fontStyle.family.slice(0, 2) : null
          }
          onChange={handleChange}
          style={fontStyle ? { color: fontStyle.color } : null}
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
  const textColor = (
    <div className="text-container">
      <span>文字颜色:</span>
      <SliderPicker color={color} onChange={onChangeColor} />
      <div className="feedback">
        <div className="feedback-text" onClick={() => handleColor(color)}>
          确认
        </div>
      </div>
    </div>
  );

  switch (step) {
    case 0:
      return ReactDOM.createPortal(textFamily, document.body);
    case 1:
      return ReactDOM.createPortal(textColor, document.body);
    case 2:
      return ReactDOM.createPortal(textNode, document.body);
  }
};

export default Text;
