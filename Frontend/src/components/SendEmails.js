import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/SendEmails.css'; // Import the CSS file

const SendEmails = () => {
  const [processedResumes, setProcessedResumes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('acceptedResumes');
    if (stored) {
      const parsed = JSON.parse(stored);
      sendEmails(parsed);
    }
  }, []);

  const sendEmails = async (resumes) => {
    try {
      const response = await axios.post('http://localhost:5000/send_email', {
        accepted_resumes: resumes,
      });

      if (response.data && response.data.results) {
        setProcessedResumes(response.data.results);
      } else {
        console.error('Unexpected response from backend:', response.data);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  return (
    <div className="send-emails-container">
      <h2 className="title">Send Emails</h2>

      {processedResumes.length === 0 ? (
        <p className="no-resumes">No accepted resumes found to send emails.</p>
      ) : (
        <div className="resume-list">
          {processedResumes.map((resume, index) => (
            <div key={index} className="resume-card">
              <p><strong>Filename:</strong> {resume.filename}</p>
              <a
                href={`http://localhost:5000/view_resume/${resume.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-pdf"
              >
                View PDF
              </a>
              <p><strong>Email:</strong> {resume.email || 'N/A'}</p>

              <p className="status">
                <strong>Status:</strong>{' '}
                <span className={resume.status === 'success' ? 'status-success' : 'status-fail'}>
                  {resume.status === 'success' ? 'Email sent ✅' : 'Failed to send ❌'}
                </span>
              </p>


            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SendEmails;
