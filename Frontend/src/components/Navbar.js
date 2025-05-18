import React ,{useState} from "react";
import { Link } from "react-router-dom";
import talentFit_Logo from "../assets/talentFit_Logo.png";
import toggleBtn from "../assets/dark-mode.png";
import "../css/Navbar.css"; // Import your CSS file for styling


const Navbar=()=>{
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };
  return(

    <nav className="navbar">
  <Link to="/" className="logo">
    <img src={talentFit_Logo} alt="TalentFit Logo" />
  </Link>

  <div className="nav-links">
    <Link to="/upload">Upload Resume</Link>
    <Link to="/login">Login</Link>

    <Link to="/about">About us</Link>
    <img
      src={toggleBtn}
      alt="Toggle"
      className="toggle-icon"
      onClick={handleToggle}
    />


  </div>
</nav>

  )
}
export default Navbar;
