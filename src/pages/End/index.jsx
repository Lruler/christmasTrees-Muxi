import React, { useState } from "react";
import { useLocation } from "react-router";
import Message from "../../components/Message";
import Header from "../../components/Header";
import "./index.css";

const width = window.innerWidth;
const End = () => {
  const location = useLocation();
  const { state } = location;
  const [isTip, setIsTip] = useState(false);

  const handleDownload = () => {
    if (width < 1000) {
      setIsTip(true);
      setTimeout(() => {
        setIsTip(false);
      }, 1000);
    } else {
      let link = document.createElement("a");
      link.download = "christmasTrees";
      link.href = state;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="end-container">
      <Header />
      <img src={state} alt="" />
      <button onClick={handleDownload}>下载图片</button>
      {isTip && <Message />}
    </div>
  );
};

export default End;
