import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShortlistPage from "./components/ShortlistPage";
import Navbar from "./components/Navbar";
import RankedResumes from "./components/RankedResumes";
import SendEmails  from "./components/SendEmails";
import LoginPage from "./components/LoginPage";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<ShortlistPage />} />
        <Route path="/RankedResumes" element={<RankedResumes />} />
        <Route path="/send-emails" element={<SendEmails />} />
        <Route path="/login" element={<LoginPage />} /> {/* Add this route */}
        <Route path="/about" element={<AboutUs />} />
        
      </Routes>
    </Router>
  );
}

export default App;
