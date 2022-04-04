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
  const [selectedId, setSlectedId] = useState(null);
  const handleRemove = () => {
    setImages((images) => {
      const imgs = images.map((img) => {
        if (img.number === +selectedId.slice(0, selectedId.indexOf("/")))
          return null;
        else return img;
      });
      imgs.splice(imgs.indexOf(null), 1);
      return imgs;
    });
    setTexts((texts) => {
      const choosedText = texts.map((text) => {
        if (text.number === +selectedId.slice(0, selectedId.indexOf("/")))
          return null;
        else return text;
      });
      texts.splice(choosedText.indexOf(null), 1);
      return texts
    })
    setSlectedId(null);
  };
  const handleAdd = (img) => {
    number++;
    setImages((images) => {
      return [...images, { url: img, number }];
    });
  };
  const handleBackground = (url) => {
    number++;
    setImages((images) => {
      return [...images, { url, number }];
    });
  };
  const handleText = (isCancel) => {
    setStep(0);
    setIsCancel(isCancel);
  };
  const DrawText = (text) => {
    number++;
    setTexts((texts) => {
      return [...texts, { text, number }];
    });
    setIsCancel(true);
    setStep(0);
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
      <div
        style={{
          display: selectedId ? "block" : "none",
        }}
        className="remove"
        onClick={handleRemove}
      >
        删除元素
      </div>
      <Header />
      <DrawImage
        setSlectedId={setSlectedId}
        selectedId={selectedId}
        images={images}
        texts={texts}
        fontStyle={fontStyle}
      />
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
