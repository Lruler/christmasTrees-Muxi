import { useState } from "react";
import img from './avatar.png'
import comment from './comment.svg'
import "./App.css";

function App() {
  const location = window.location.href.slice(0, -1) + img
  return (
    <div className="App">
      <img src={img} alt="img" />
      <a href={img} download>点击下载</a>
      <img src={comment} alt="comment" />
      <a href={comment} download>点击下载图片二</a>
    </div>
  );
}

export default App;
