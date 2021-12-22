import React, { useState } from "react";
import Header from "../../components/Header";
import DrawImage from "../../components/DrawImage";
import ImageTab from "../../components/ImageTab";
import xuehua from "../../static/other/xuehua.svg";
import "./index.css";

let number = 0;
const Drawing = () => {
  const [images, setImages] = useState([]);
  const handleAdd = (img) => {
    setImages((images) => {
      number++
      return [...images, { url: img, number }];
    });
  };
  return (
    <div className="drawingpage">
      <img className="xuehua" src={xuehua}></img>
      <Header />
      <DrawImage images={images} />
      <ImageTab handleAdd={handleAdd} />
    </div>
  );
};

export default Drawing;
