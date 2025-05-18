import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../css/ShortlistPage.css'; // Import the CSS file

const ShortlistPage = () => {
  const [resumes, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [response, setResponse] = useState("");
  const [method, setMethod] = useState("tfidf");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!resumes || resumes.length === 0 || !jobDesc.trim()) {
      setResponse("Please select resumes and enter a job description.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < resumes.length; i++) {
      formData.append("resumes", resumes[i]);
    }
    formData.append("job_description", jobDesc);
    formData.append("method", method);  // BERT or TF-IDF

    try {
      const res = await axios.post("http://localhost:5000/upload_resume", formData);
      const rankedResumes = res.data;

      navigate('/RankedResumes', {
        state: {
          rankedResumes,
          jobDescription: jobDesc
        }
      });
    } catch (err) {
      console.error("Error uploading:", err);
      setResponse("Error uploading resumes.");
    }
  };

  return (
    <div className="container p-8 mx-auto max-w-2xl">
      <h2 className="dashboardHeading">Resume Shortlister</h2>

      <div className="file-input-wrapper mb-4">
        <label className="block mb-2">Select Your Resume(s) (.pdf only)</label>
        <label className="custom-file-upload">
          <input 
            type="file" 
            multiple 
            accept=".pdf" 
            onChange={e => setResume(e.target.files)} 
          />
          Choose Files
        </label>
        {resumes && <div className="selected-files">{Array.from(resumes).map(file => file.name).join(', ')}</div>}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Enter Job Description</label>
        <textarea
          className="textarea"
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Matching Method</label>
        <select 
          value={method} 
          onChange={e => setMethod(e.target.value)} 
          className="border p-2 rounded w-full"
        >
          <option value="tfidf">TF-IDF (Faster, simpler)</option>
          <option value="bert">BERT (Smarter, semantic match)</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Review It
        </button>
        <button
          onClick={() => {
            setResume(null);
            setJobDesc("");
            setResponse("");
          }}
          className="border px-4 py-2 rounded"
        >
          Clear
        </button>
      </div>

      {response && <p className="mt-4 text-red-500">{response}</p>}
    </div>
  );
};

export default ShortlistPage;
