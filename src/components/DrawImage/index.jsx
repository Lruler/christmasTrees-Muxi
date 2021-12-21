import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";
import avatar from "../../static/avatar.png";
import "./index.css";

const downloadURI = (uri, name) => {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

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

const DrawImage = () => {
  const treeRef = useRef(null);
  const [images, setImages] = useState([]);
  const [stageSize, setStageSize] = useState({});
  const handleExport = () => {
    const uri = treeRef.current.toDataURL();
    downloadURI(uri, "test.png");
  };
  const handleAdd = () => {
    setImages((images) => {
      return [...images, avatar];
    });
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
            {images?.map((url,index) => {
              return <ImageComponents key={index} imgUrl={url} />;
            })}
          </Layer>
        </Stage>
      </div>
    </>
  );
};

export default DrawImage;
