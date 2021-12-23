import React, { useState, useRef } from "react";
import { useLocation } from "react-router";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Message from "../../components/Message";
import Header from "../../components/Header";
import xuehua from "../../../static/other/xuehua.svg";
import rahmen from "../../../static/other/rahmen.svg";
import "./index.css";

const DownLoadImage = (props) => {
  const { x, y, url } = props;
  const [image] = url ? useImage(url) : useImage(rahmen);
  const rahmenX = (x - 328) / 2;
  const rahmenY = (y - 556) / 2;
  return <Image draggable x={rahmenX} y={rahmenY} image={image} />;
};

const End = () => {
  const location = useLocation();
  const { state } = location;
  const downloadRef = useRef();
  const [isTip, setIsTip] = useState(false);
  const [isDownload, setIsDownload] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const width = window.innerWidth;
  const height = window.innerHeight * 0.9;
  const handleDownload = () => {
    if (width < 1000) {
      const uri = downloadRef.current.toDataURL();
      setDownloadUrl(uri);
      setIsDownload(true);
      setIsTip(true);
      setTimeout(() => {
        setIsTip(false);
      }, 1000);
    } else {
      const uri = downloadRef.current.toDataURL();
      let link = document.createElement("a");
      link.download = "christmasTrees";
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="end-container">
      <Header />
      <img src={xuehua} className="xuehua"></img>
      {isDownload ? (
        <img src={downloadUrl} className="downloadImg" />
      ) : (
        <Stage ref={downloadRef} width={width} height={height}>
          <Layer>
            <DownLoadImage x={width} y={height} />
            <DownLoadImage x={width} y={height} url={state} />
          </Layer>
        </Stage>
      )}
      <div onClick={handleDownload} className="downloadtree">
        下载图片
      </div>
      {isTip && <Message />}
    </div>
  );
};

export default End;
