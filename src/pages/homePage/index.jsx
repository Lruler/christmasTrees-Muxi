import React from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  const goDraw = () => {
    navigate("/drawing");
  };
  return (
    <>
      <button onClick={goDraw}>开始</button>
    </>
  );
};

export default HomePage;
