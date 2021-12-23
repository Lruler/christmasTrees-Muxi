import React, { useState } from "react";
import xuehua from "../../../static/other/xuehua.svg";
import "./index.css";

const choiceTabs = import.meta.globEager(`/static/tabs/*.*`);
const caideng = import.meta.globEager(`/static/caideng/*.*`);
const lingdang = import.meta.globEager(`/static/lingdang/*.*`);
const shengdanwa = import.meta.globEager(`/static/shengdanwa/*.*`);
const shugan = import.meta.globEager(`/static/shugan/*.*`);
const shuye = import.meta.globEager(`/static/shuye/*.*`);
const xingxing = import.meta.globEager(`/static/xingxing/*.*`);
const guaizhang = import.meta.globEager(`/static/guaizhang/*.*`);

console.log(choiceTabs);
console.log(xuehua);

const ImageTab = (props) => {
  const imgs = {
    choiceTabs: Object.keys(choiceTabs),
    caideng: Object.keys(caideng),
    lingdang: Object.keys(lingdang),
    shengdanwa: Object.keys(shengdanwa),
    shugan: Object.keys(shugan),
    shuye: Object.keys(shuye),
    xingxing: Object.keys(xingxing),
    guaizhang: Object.keys(guaizhang),
  };
  let tabs = [];
  for (let i = 0; i < imgs.choiceTabs.length; i++) {
    const tab = imgs.choiceTabs[i];
    const tabTips = tab.slice(tab.lastIndexOf("/") + 1, tab.indexOf("."));
    tabs.push({ categories: tab, details: imgs[tabTips] });
  }
  const { handleAdd, handleBackground, handleText } = props;
  const [tips, setTips] = useState({ isTips: false, tipsDtl: [] });
  const [clicked, setClicked] = useState(Array(tabs.length).fill(false));
  const handleTips = (img, index) => {
    if (img.categories.includes("文字")) {
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
