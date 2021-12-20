import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";
import avatar from "../../static/avatar.png";

const downloadURI = (uri, name) => {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const AvatarImage = () => {
  const imgRef = useRef();
  const trRef = useRef();
  const [image] = useImage(avatar);
  const [isTrans, setIsTrans] = useState(false);
  const [imageState, setImageState] = useState({
    x: 50,
    y: 50,
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

  const handleExport = () => {
    const uri = treeRef.current.toDataURL();
    downloadURI(uri, "test.png");
  };

  return (
    <>
      <button onClick={handleExport}>点我下载</button>
      <Stage ref={treeRef} width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <AvatarImage />
        </Layer>
      </Stage>
    </>
  );
};

export default DrawImage;
