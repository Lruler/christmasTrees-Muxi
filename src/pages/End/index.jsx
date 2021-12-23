import React, { useState } from "react";
import { useLocation } from "react-router";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Message from "../../components/Message";
import Header from "../../components/Header";
import xuehua from "../../static/other/xuehua.svg";
import rahmen from "../../static/other/rahmen.svg";
import "./index.css";

const DownLoadImage = (props) => {
  const { x, y } = props;
  const [image] = useImage(rahmen);
  const rahmenX = x
  return <Image image={image} />;
};

const End = () => {
  const location = useLocation();
  const { state } = location;
  const [isTip, setIsTip] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight * 0.9;
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
      <img src={xuehua} className="xuehua"></img>
      <Stage width={width} height={height}>
        <Layer>
          <DownLoadImage x={width} y={height} />
        </Layer>
      </Stage>
      <div onClick={handleDownload} className="downloadtree">
        下载图片
      </div>
      {isTip && <Message />}
    </div>
  );
};

export default End;
