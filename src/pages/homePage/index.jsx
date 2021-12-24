import React from "react";
import { useNavigate } from "react-router";
import homepage from "../../../static/other/homepage.svg";
import "./index.css";

const HomePage = () => {
  const navigate = useNavigate();
  const goDraw = () => {
    navigate("/drawing");
  };
  return (
    <div className="homepage">
      <img
        src={homepage}
        className={window.innerWidth > 1000 ? "homeimg" : "mobiveimg"}
        alt=""
      />
      <div className="start" onClick={goDraw}>
        开始
      </div>
    </div>
  );
};

export default HomePage;
