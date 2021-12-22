import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Transformer, Text } from "react-konva";
import { useNavigate } from "react-router";
import useImage from "use-image";
import "./index.css";

const ImageComponents = (props) => {
  const { imgUrl, isSelected, onSelect } = props;
  const imgRef = useRef();
  const trRef = useRef();
  const [image] = useImage(imgUrl);
  const [imageState, setImageState] = useState({
    x: 200,
    y: 200,
  });

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
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
        onClick={onSelect}
        onTap={onSelect}
      />
      {isSelected && (
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

const TextComponents = (props) => {
  const { text, isSelected, onSelect } = props;
  const textRef = useRef();
  const trRef = useRef();
  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <>
      <Text
        ref={textRef}
        text={text}
        fontSize={25}
        draggable
        onClick={onSelect}
        onTap={onSelect}
      />
      {isSelected && (
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
  const { images, texts } = props;
  const treeRef = useRef(null);
  const navigate = useNavigate();
  const [stageSize, setStageSize] = useState({});
  const [selectedId, setSlectedId] = useState(null);
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
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSlectedId(null);
    }
  };
  return (
    <>
      <div id="canvas">
        <Stage
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          ref={treeRef}
          width={stageSize.width}
          height={stageSize.height}
        >
          <Layer>
            {images?.map((image, index) => {
              const id = image.number + image.url;
              return (
                <ImageComponents
                  key={index}
                  imgUrl={image.url}
                  isSelected={id === selectedId}
                  onSelect={() => {
                    setSlectedId(id);
                  }}
                />
              );
            })}
            {texts?.map((textObj) => {
              const id = textObj.text + textObj.number;
              return (
                <TextComponents
                  key={id}
                  text={textObj.text}
                  isSelected={id === selectedId}
                  onSelect={() => {
                    setSlectedId(id);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
      <div onClick={handleExport} className="download">
        导出图片
      </div>
    </>
  );
};

export default DrawImage;
