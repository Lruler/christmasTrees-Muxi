import React, { useState } from "react";
import avatar from "../../static/avatar.png";
import comment from "../../static/comment.svg";
import "./index.css";

const tabs = [
  {
    categories: avatar,
    details: [avatar, avatar, avatar, avatar, avatar, avatar, avatar],
  },
  {
    categories: comment,
    details: [comment, comment, comment, comment, comment, comment],
  },
  {
    categories: avatar,
    details: [avatar, avatar, avatar, avatar, avatar, avatar, avatar],
  },
  {
    categories: comment,
    details: [comment, comment, comment, comment, comment, comment],
  },
  {
    categories: avatar,
    details: [avatar, avatar, avatar, avatar, avatar, avatar, avatar],
  },
  {
    categories: comment,
    details: [comment, comment, comment, comment, comment, comment],
  },
  {
    categories: avatar,
    details: [avatar, avatar, avatar, avatar, avatar, avatar, avatar],
  },
  {
    categories: comment,
    details: [comment, comment, comment, comment, comment, comment],
  },
  {
    categories: avatar,
    details: [avatar, avatar, avatar, avatar, avatar, avatar, avatar],
  },
  {
    categories: comment,
    details: [comment, comment, comment, comment, comment, comment],
  },
];
const ImageTab = (props) => {
  const { handleAdd } = props;
  const [tips, setTips] = useState({ isTips: false, tipsDtl: [] });
  const handleTips = (imgs) => {
    setTips({ ...tips, tipsDtl: imgs });
  };
  const Add = (img) => {
    handleAdd(img);
  };
  return (
    <div className="imagetab">
      <div className="image-tips">
        {tips.tipsDtl?.map((img, index) => {
          return <img onClick={() => Add(img)} key={index} src={img}></img>;
        })}
      </div>
      <div className="image-choice">
        {tabs.map((img, index) => {
          return (
            <img
              onClick={() => handleTips(img.details)}
              key={index}
              src={img.categories}
            ></img>
          );
        })}
      </div>
    </div>
  );
};

export default ImageTab;
