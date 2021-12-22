import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import Drawing from "./pages/Drawing";
import End from "./pages/End";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="drawing" element={<Drawing />} />
          <Route path="end" element={<End />} />
          <Route path="/" element={<Navigate to="homepage" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
