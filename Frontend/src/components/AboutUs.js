import React from 'react';
import '../css/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>

        <p className="about-text">
          <strong className="highlight">Talent Fit Shortlister</strong> is an AI-powered resume shortlisting platform designed to help recruiters and HR professionals quickly find the best candidates for any job role. We leverage modern NLP techniques and web technologies to automate and improve the hiring process.
        </p>

        <p className="about-text">
          Our project uses intelligent matching models like <span className="highlight">TF-IDF</span> and <span className="highlight">BERT</span> to analyze resumes and job descriptions, ensuring a smart and fair ranking system that saves time and effort.
        </p>

        <h2 className="about-subtitle">🔍 Key Features:</h2>
        <ul className="feature-list">
          <li>Resume upload & PDF text extraction</li>
          <li>TF-IDF & BERT-based smart matching</li>
          <li>Ranking of resumes based on job fit</li>
          <li>Accept/Reject UI with one-click control</li>
          <li>Automated email sending to selected candidates</li>
        </ul>

        <h2 className="about-subtitle">🎯 Our Mission:</h2>
        <p className="about-text">
          We aim to empower hiring teams with intelligent tools to simplify and accelerate recruitment, while giving job seekers a fair chance based on their true skill match.
        </p>

        <h2 className="about-subtitle">👨‍💻 Built By:</h2>
        <p className="about-text">
          A final-year BTech student passionate about combining <span className="highlight">Machine Learning</span> and <span className="highlight">Web Development</span> to solve real-world problems.
        </p>

        <h2 className="about-subtitle" id="contact">📧 Contact Us:</h2>
        <p className="about-text">
          For any inquiries, feedback, or collaboration opportunities, feel free to reach out to us at:
          <br />
          <a href="mailto:mannlearn210@gmail.com" className="contact-email">
            mannlearn210@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
