import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drawing from "./pages/Drawing";
import End from "./pages/End";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="drawing" element={<Drawing />} />
          <Route path="end" element={<End />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
