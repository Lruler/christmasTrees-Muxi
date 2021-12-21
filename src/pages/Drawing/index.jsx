import React, { useState } from "react";
import DrawImage from "../../components/DrawImage";
import ImageTab from "../../components/ImageTab";

const Drawing = () => {
  const [images, setImages] = useState([]);
  const handleAdd = (img) => {
    setImages((images) => {
      return [...images, img];
    });
  };
  return (
    <>
      <DrawImage images={images} />
      <ImageTab handleAdd={handleAdd} />
    </>
  );
};

export default Drawing;
