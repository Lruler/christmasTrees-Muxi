import React from "react";
import avatar from '../../static/avatar.png'
import './index.css'

const ImageTab = () => {
  return (
    <div className="imagetab">
      <div className="image-tips"></div>
      <div className="image-choice">
        <img src={avatar} />
        <img src={avatar} />
        <img src={avatar} />
        <img src={avatar} />
        <img src={avatar} />
        <img src={avatar} />
        <img src={avatar} />
        <img src={avatar} />
        <img src={avatar} />
        <img src={avatar} />
        <img src={avatar} />
      </div>
    </div>
  );
};

export default ImageTab;
