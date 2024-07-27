import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CryptoDetails from "./pages/CryptoDetails";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <div className="bg-white dark:bg-[#181A20] text-black dark:text-white min-h-[100vh]">
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crypto/:cryptoId" element={<CryptoDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
