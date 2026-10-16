# TalentFit Shortlister: AI-Powered Resume Screening System 🚀

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React.js-Frontend-61DAFB?logo=react)](https://reactjs.org/)
[![NLP](https://img.shields.io/badge/NLP-BERT%20%7C%20TF--IDF-FF9D00)](https://huggingface.co/models)

## 📌 Overview
In today’s fast-paced recruitment environment, Human Resource (HR) professionals face the challenge of manually screening large volumes of resumes—a process that is both time-consuming and inefficient. 

**TalentFit Shortlister** is an intelligent, automated resume shortlisting web application. By leveraging Natural Language Processing (NLP) and machine learning-based similarity models, the system accurately matches bulk uploaded candidate resumes against a target Job Description (JD) without manual intervention. It closes the recruitment loop by automatically emailing the top-ranked candidates.

## 🎯 The Core Problem & Solution
* **The Problem:** Traditional ATS (Applicant Tracking Systems) often rely on rigid keyword matching, rejecting highly qualified candidates, while manual screening suffers from human fatigue and bias.
* **The Solution:** A dual-engine machine learning approach. By combining keyword analysis with deep semantic understanding, TalentFit Shortlister ensures that candidates who have the right skills—even if phrased differently—are accurately evaluated, ranked, and contacted.

## 👁️ Sneak Peek

__Home Page__

![App Demo](artifacts\img\homePage.png)  

__Inserting Resumes__

![App Demo](artifacts\img\UploadFIles.png)

__Adding JD__

![App Demo](artifacts\img\UploadingJD.png)

__Selecting Candidates & Reaching out__

![App Demo](artifacts\gif\SelctingReachingOut.gif)

__Automation Email Reach out__

![App Demo](artifacts\img\emailRecv.png)

## ✨ Key Features
* **Bulk PDF Parsing:** Seamlessly extract and clean textual content from multiple uploaded PDF resumes using `pdfminer`.
* **Dual-Engine Similarity Scoring:** 
  * **TF-IDF (Term Frequency-Inverse Document Frequency):** Ensures essential industry keywords and hard skills from the JD are present in the resume.
  * **BERT (Bidirectional Encoder Representations from Transformers):** Provides deep, semantic-level understanding of the resume's context, evaluating the actual meaning behind a candidate's experience.
* **Interactive HR Dashboard:** A React.js frontend that visually presents ranked candidates alongside their match percentages, allowing HR personnel to select top choices via simple checkboxes.
* **Automated Email Outreach:** Utilizes Regular Expressions (RegEx) to extract contact details from selected PDFs and automatically dispatches interview invitations via SMTP integration.

## 🧠 System Architecture & Workflow
1. **Input:** HR uploads a batch of candidate PDFs and pastes the target Job Description into the React interface.
2. **Extraction:** The backend parses the PDFs into raw text strings.
3. **NLP Processing:** Both TF-IDF and BERT models compute cosine similarity scores between each resume and the JD.
4. **Ranking:** Resumes are ordered by their similarity scores and returned to the frontend.
5. **Automation:** Upon HR selection, the backend extracts candidate emails and triggers SMTP notifications.

## 📁 Repository Structure

```text
TalentFit-Shorlister/
│
├── Backend/                   # Python / Flask API and NLP Engine
│   ├── app.py                 # Main application server and API routes
│   ├── uploaded_resumes/      # dumping pdf
│   ├── resume_processing      # presume preprocessing(extracting,embedding,cosine similarity/BERT)
│
├── database/                  # Python / Flask API and NLP Engine
│   ├── db_config.py           # Initialize resume connection using Mongo
│   ├── hr_decision.py         # hr decision saving
│   ├── save_resumes.py        # Ranked Resumes saved in database
│
├── Frontend/                  # React.js User Interface
│   ├── public/                # Static assets
|       ├── index.html
|       ├── manifest.json
|       ├── robots.txt
|       ├── talentFit_logo.png # app icon
│   ├── src/
│   │   ├── assets/            # UI components (Upload form, Ranking Table)
│   │   ├── components/        # UI components (Upload form, Ranking Table)
│   │   ├── css/               # UI components css (Upload form, Ranking Table)
│   │   ├── pages/             # home page
│   │   ├── App.js             # Main React application
│   │   ├── index.css          # Main React css
│   │   ├── index.js             # Main React js
│   │   ├── reportWebVitals.js           
│   │   ├── setupTests.js             # Main React application
│   └── package.json           # Node.js dependencies
│
├── uploaded_resumes/          # (Optional) Sample resumes and JD for testing
├── README.md                  # Project documentation
└── .gitignore                 # Ignored files (node_modules, venv, .env)
└── requirements.txt           # library dependencies

```

## 🛠️ Tech Stack
* **Frontend:** React.js
* **Backend:** Python (Flask/FastAPI)
* **Machine Learning & NLP:** Scikit-Learn (TF-IDF), HuggingFace Transformers (BERT)
* **Document Processing:** `pdfminer.six`
* **Utilities:** `re` (RegEx for entity extraction), `smtplib` (Email Automation)

## ⚙️ Local Setup & Installation

### Prerequisites
* Python 3.10+
* Node.js & npm (for React frontend)

### 1. Clone the Repository
```bash
git clone https://github.com/mann-lean/TalentFit-Shorlister.git
cd TalentFit-Shorlister
```

### 2. Backend Setup
Navigate to the backend directory and create a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

Install the required Python dependencies:
```bash
pip install -r requirements.txt
```

(Note: Create a .env file in the backend directory to store your SMTP email credentials securely.)

Run the backend server:
```bash
python app.py
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory:

```bash
cd frontend
npm install
```
Start the React development server:

```bash
npm start
```
The application should now be running at `http://localhost:3000`.


## 📫 Let's Connect

<!-- **Mann**   -->
<!-- *Data Scientist | Machine Learning Engineer*   -->
Passionate about building end-to-end MLOps pipelines and data-driven business solutions.

* 💼 **LinkedIn:** [Click here to connect](http://www.linkedin.com/in/mann-32718a1b9)
* 🐙 **GitHub:** [Explore my other projects](https://github.com/mann-lean)
* ✉️ **Email:** [Reach out via email](mailto:mannk7062@gmail.com)
<!-- * 🌐 **Portfolio:** [View my complete portfolio](https://YOUR_PORTFOLIO_LINK)