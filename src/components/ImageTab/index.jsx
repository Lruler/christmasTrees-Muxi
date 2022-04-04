import React, { useState } from "react";
import "./index.css";

const caideng = import.meta.globEager(`../../static/caideng/*.*`);
const lingdang = import.meta.globEager(`../../static/lingdang/*.*`);
const shengdanwa = import.meta.globEager(`../../static/shengdanwa/*.*`);
const bshugan = import.meta.globEager(`../../static/bshugan/*.*`);
const ashuye = import.meta.globEager(`../../static/ashuye/*.*`);
const xingxing = import.meta.globEager(`../../static/xingxing/*.*`);
const guaizhang = import.meta.globEager(`../../static/guaizhang/*.*`);
const choiceTabs = import.meta.globEager(`../../static/tabs/*.*`);

const ImageTab = (props) => {
  const imgs = [
    Object.values(choiceTabs),
    Object.values(ashuye),
    Object.values(bshugan),
    Object.values(caideng),
    Object.values(guaizhang),
    Object.values(lingdang),
    Object.values(shengdanwa),
    Object.values(xingxing),
  ];
  let tabs = [];
  for (let i = 0; i < imgs[0].length; i++) {
    const tab = imgs[0][i].default;
    tabs.push({ categories: tab, details: imgs[i + 1] });
  }
  const { handleAdd, handleBackground, handleText } = props;
  const [tips, setTips] = useState({ isTips: false, tipsDtl: [] });
  const [clicked, setClicked] = useState(Array(tabs.length).fill(false));
  const handleTips = (img, index) => {
    if (index === 8) {
      setTips({ isTips: true, tipsDtl: [] });
      handleText(false);
    } else {
      let newClicked = Array(tabs.length).fill(false);
      newClicked[index] = true;
      handleText(true);
      setClicked(newClicked);
      setTips({ isTips: true, tipsDtl: img.details });
    }
  };
  const Add = (img) => {
    handleAdd(img);
  };
  const upImg = (e) => {
    const imgFile = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = (e) => {
      handleBackground(e.target.result);
    };
  };
  return (
    <div className="imagetab">
      <div className="image-tips">
        <div className="image-background">
          {tips.isTips &&
            tips.tipsDtl?.map((img) => {
              return (
                <div className="image-tip-coniner" key={img.default}>
                  <img onClick={() => Add(img.default)} src={img.default}></img>
                </div>
              );
            })}
        </div>
      </div>
      <div className="image-choice">
        <div className="image-up">
          {tabs.map((img, index) => {
            return (
              <div
                className="image-container"
                key={img.categories}
                style={clicked[index] ? { height: "125%" } : null}
              >
                {index === 7 ? (
                  <div className="file">
                    <img
                      style={clicked[index] ? { height: "116%" } : null}
                      onClick={() => handleTips(img, index)}
                      src={img.categories}
                    ></img>
                    <input type="file" accept="image/*" onChange={upImg} />
                  </div>
                ) : (
                  <img
                    onClick={() => handleTips(img, index)}
                    src={img.categories}
                  ></img>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageTab;
