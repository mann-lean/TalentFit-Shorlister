import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/RankedResumes.css";

const RankedResumes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rankedResumes, jobDescription } = location.state || { rankedResumes: [], jobDescription: '' };

  const [selectedResumes, setSelectedResumes] = useState([]);

  const handleCheckboxChange = (resume) => {
    const isSelected = selectedResumes.find(r => r.filename === resume.filename);
    if (isSelected) {
      setSelectedResumes(selectedResumes.filter(r => r.filename !== resume.filename));
    } else {
      setSelectedResumes([...selectedResumes, resume]);
    }
  };

  const handleSelectAll = () => {
    if (selectedResumes.length === rankedResumes.length) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes([...rankedResumes]);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ranked Resumes</h2>

      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={selectedResumes.length === rankedResumes.length}
            onChange={handleSelectAll}
          />{' '}
          Select All
        </label>
        <p className="mt-2">✅ Accepted Resumes: {selectedResumes.length}</p>
      </div>

      {rankedResumes.length === 0 ? (
        <p>No resumes to display.</p>
      ) : (
        rankedResumes.map((resume, index) => {
          const isAccepted = selectedResumes.find(r => r.filename === resume.filename);
          return (
            <div
              key={index}
              className={`resume-card ${isAccepted ? 'selected' : ''}`}
            >
              <div className="resume-info">
                <label className="resume-label">
                  <input
                    type="checkbox"
                    checked={isAccepted}
                    onChange={() => handleCheckboxChange(resume)}
                    className="checkbox"
                  />
                  <strong>{resume.filename}</strong> — Score: {resume.score.toFixed(2)}%
                </label>

                <button
                  onClick={() => window.open(`http://localhost:5000/view_resume/${resume.filename}`, '_blank')}
                  className="bg-gray-200 px-3 py-1 rounded view-pdf-btn"
                >
                  View PDF
                </button>
              </div>
            </div>
          );
        })
      )}

      {selectedResumes.length > 0 && (
        <button
          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
          onClick={() => {
            localStorage.setItem('acceptedResumes', JSON.stringify(selectedResumes));
            navigate('/send-emails');
          }}
        >
          Proceed to Send Emails
        </button>
      )}
    </div>
  );
};

export default RankedResumes;
