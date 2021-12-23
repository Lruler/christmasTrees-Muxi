import React, { useState } from "react";
import Header from "../../components/Header";
import DrawImage from "../../components/DrawImage";
import ImageTab from "../../components/ImageTab";
import xuehua from "../../static/other/xuehua.svg";
import Text from "../../components/Text/Text";
import "./index.css";

let number = 0;
const Drawing = () => {
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [isCancel, setIsCancel] = useState(true);
  const [step, setStep] = useState(0);
  const [fontStyle, setFontStyle] = useState(null);
  const handleAdd = (img) => {
    number++;
    setImages((images) => {
      return [...images, { url: img, number }];
    });
  };
  const handleBackground = (url) => {
    number++;
    setImages((images) => {
      return [{ url, number }, ...images];
    });
  };
  const handleText = (isCancel) => {
    setIsCancel(isCancel);
  };
  const DrawText = (text) => {
    number++;
    setTexts((texts) => {
      return [...texts, { text, number }];
    });
    setIsCancel(true);
  };
  const handleFontStyle = (style) => {
    setStep((step) => step + 1);
    if (!style.includes("#")) {
      setFontStyle({ family: style });
    } else {
      setFontStyle((family) => {
        return { ...family, color: style };
      });
    }
  };
  return (
    <div className="drawingpage">
      <img className="xuehua" src={xuehua}></img>
      <Header />
      <DrawImage images={images} texts={texts} fontStyle={fontStyle} />
      <ImageTab
        handleAdd={handleAdd}
        handleBackground={handleBackground}
        handleText={handleText}
      />
      {isCancel ? null : (
        <Text
          step={step}
          fontStyle={fontStyle}
          handleText={handleText}
          handleFontStyle={handleFontStyle}
          isCancel={isCancel}
          DrawText={DrawText}
        />
      )}
    </div>
  );
};

export default Drawing;
