from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from resume_processing import (
    extract_email_and_name,
    rank_resumes,
    extract_text_from_pdf
)
from email.message import EmailMessage
import smtplib

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploaded_resumes'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


# --- Upload and Process Resumes ---
@app.route("/upload_resume", methods=["POST"])
def upload_resume():
    job_desc = request.form.get("job_description", "")
    method = request.form.get("method", "tfidf")  # "tfidf" or "bert"
    uploaded_files = request.files.getlist("resumes")

    # Clear old resumes
    for f in os.listdir(UPLOAD_FOLDER):
        os.remove(os.path.join(UPLOAD_FOLDER, f))

    for file in uploaded_files:
        filename = file.filename
        file.save(os.path.join(UPLOAD_FOLDER, filename))

    ranked_resumes = rank_resumes(UPLOAD_FOLDER, job_desc, method)
    return jsonify(ranked_resumes)


# --- HR Accept/Reject Decision ---
@app.route("/hr", methods=["POST"])
def hr_decision():
    data = request.get_json()
    resume_name = data.get("resume_name")
    decision = data.get("decision")
    job_desc = data.get("job_descripttion", "")
    print(f"HR marked {resume_name} as {decision} for job: {job_desc}")
    return jsonify({"message": "Decision recorded."})


# --- View Resume as PDF ---
@app.route("/view_resume/<filename>", methods=["GET"])
def view_resume(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


# --- Helper to Send Email ---
def send_selection_email(name, email):
    try:
        msg = EmailMessage()
        msg['Subject'] = 'Your Resume Has Been Shortlisted'
        msg['From'] = 'your-email@example.com'
        msg['To'] = email
        msg.set_content(
            f"Dear Candidate,\n\n"
            "Thank you for applying. Your resume has been shortlisted for the next round. "
            "We will contact you shortly with further details.\n\nRegards,\nHR Team"
        )


        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login('xyz@gmail.com', 'password')  # add here smtp email & password!
            smtp.send_message(msg)

        return True
    except Exception as e:
        print("Failed to send email:", e)
        return False


# --- Send Emails to Accepted Candidates ---
@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.get_json()
    accepted_resumes = data.get('accepted_resumes', [])

    results = []
    for resume in accepted_resumes:
        filename = resume['filename']
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        name, email = extract_email_and_name(file_path)
        print(f"Extracted: {name} <{email}>")

        status = 'fail'
        if email:
            if send_selection_email(name or "Candidate", email):
                status = 'success'

        results.append({
            "filename": filename,
            "name": name,
            "email": email,
            "status": status
        })

    return jsonify({"message": "Emails processed", "results": results})


if __name__ == "__main__":
    app.run(debug=True)
