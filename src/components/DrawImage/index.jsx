import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import { useNavigate } from "react-router";
import useImage from "use-image";
import avatar from "../../static/avatar.png";
import "./index.css";

const ImageComponents = (props) => {
  const { imgUrl } = props;
  const imgRef = useRef();
  const trRef = useRef();
  const [image] = useImage(imgUrl);
  const [isTrans, setIsTrans] = useState(false);
  const [imageState, setImageState] = useState({
    x: 200,
    y: 200,
  });

  useEffect(() => {
    if (isTrans) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    } else {
      setTimeout(() => {
        setIsTrans(true);
      }, 100);
    }
  }, [isTrans]);
  const handleStart = () => {
    setImageState({ ...imageState, isDragging: true });
  };
  const handleEnd = (e) => {
    setImageState({
      isDragging: false,
      x: e.target.x(),
      y: e.target.y(),
    });
  };
  return (
    <>
      <Image
        x={imageState.x}
        y={imageState.y}
        ref={imgRef}
        draggable
        image={image}
        onDragStart={handleStart}
        onDragEnd={handleEnd}
      />
      {isTrans && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const DrawImage = (props) => {
  const { images } = props;
  const treeRef = useRef(null);
  const navigate = useNavigate();
  const [stageSize, setStageSize] = useState({});
  const handleExport = () => {
    const uri = treeRef.current.toDataURL();
    navigate("/end", { state: uri });
  };
  useEffect(() => {
    const canvasContainer = document.getElementById("canvas");
    const style = getComputedStyle(canvasContainer);
    const height = +style.height.slice(0, -2);
    const width = +style.width.slice(0, -2);
    setStageSize({ height, width });
  }, []);

  return (
    <>
      <div id="canvas">
        <Stage ref={treeRef} width={stageSize.width} height={stageSize.height}>
          <Layer>
            {images?.map((url, index) => {
              return <ImageComponents key={index} imgUrl={url} />;
            })}
          </Layer>
        </Stage>
      </div>
      <button onClick={handleExport} className="download">
        导出图片
      </button>
    </>
  );
};

export default DrawImage;
