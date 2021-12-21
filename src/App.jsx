import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DrawImage from "./components/DrawImage";
import ImageTab from "./components/ImageTab";
import "./App.css";

function App() {
  return (
    <>
      <DrawImage />
      <ImageTab />
    </>
  );
}

export default App;
