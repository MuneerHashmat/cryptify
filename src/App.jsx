import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CryptoDetails from "./pages/CryptoDetails";

function App() {
  return (
    <div className="bg-white dark:bg-[#181A20] text-black dark:text-white min-h-[100vh]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crypto/:cryptoId" element={<CryptoDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
