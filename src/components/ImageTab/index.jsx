import React, { useState } from "react";
import "./index.css";

const imgs = {
  choiceTabs: Object.keys(import.meta.globEager(`/src/static/tabs/*.*`)),
  caideng: Object.keys(import.meta.globEager(`/src/static/caideng/*.*`)),
  lingdang: Object.keys(import.meta.globEager(`/src/static/lingdang/*.*`)),
  shengdanwa: Object.keys(import.meta.globEager(`/src/static/shengdanwa/*.*`)),
  shugan: Object.keys(import.meta.globEager(`/src/static/shugan/*.*`)),
  shuye: Object.keys(import.meta.globEager(`/src/static/shuye/*.*`)),
  xingxing: Object.keys(import.meta.globEager(`/src/static/xingxing/*.*`)),
};
let tabs = [];
for (let i = 0; i < imgs.choiceTabs.length; i++) {
  const tab = imgs.choiceTabs[i];
  const tabTips = tab.slice(tab.lastIndexOf("/") + 1, tab.indexOf("."));
  tabs.push({ categories: tab, details: imgs[tabTips] });
}
const ImageTab = (props) => {
  const { handleAdd, handleBackground, handleText } = props;
  const [tips, setTips] = useState({ isTips: false, tipsDtl: [] });
  const [clicked, setClicked] = useState(Array(tabs.length).fill(false));
  const handleTips = (img, index) => {
    if (img.categories.includes("文字")) {
      handleText();
    } else {
      let newClicked = Array(tabs.length).fill(false);
      newClicked[index] = true;
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
                <div className="image-tip-coniner" key={img}>
                  <img onClick={() => Add(img)} src={img}></img>
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
                {img.categories.includes("图片") ? (
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
