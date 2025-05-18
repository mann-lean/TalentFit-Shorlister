import React from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";
import Footer from "../components/Footer.js";

const HomePage = () => (
  <>
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="Heading">
        Looking for a way to know if your <span className="text-pink-500">Resume</span> is a Good fit for the Job?
      </h1>
      <p className="text-gray-600 max-w-xl mb-6">
        Check how good your resume is for the job you are applying for. Our Resume Shortlister AI Tool gives you a score and email automation.
      </p>
      <div className="flex space-x-4">
        <Link to="/upload" className="ShortList-btn bg-black text-white px-6 py-2 rounded-md">Shortlist Resume</Link>
        <Link to="/login" className="bg-white border px-6 py-2 rounded-md">Login</Link>
      </div>
    </div>

    {/* Move Footer OUTSIDE flex container */}
    <Footer />
  </>
);

export default HomePage;
