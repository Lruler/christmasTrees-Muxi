import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const End = () => {
  const location = useLocation();
  const { state } = location;
  const handleDownload = () => {
    let link = document.createElement("a");
    link.download = "christmasTrees";
    link.href = state;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      我是结束
      <img src={state} alt="" />
      <button onClick={handleDownload}>下载图片</button>
    </>
  );
};

export default End;
