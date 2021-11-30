import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Postpage from "./Pages/Postpage";
import { Register } from "./Pages/AuthPages";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />

        <Route exact path="/post/add" element={<Postpage />} />

        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
