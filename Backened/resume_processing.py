import os
import re
from PyPDF2 import PdfReader
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util

# Load BERT model once
bert_model = SentenceTransformer('all-MiniLM-L6-v2')


# --- Extract Text From PDF ---
def extract_text_from_pdf(file_path):
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        print(f"Error extracting text from {file_path}: {e}")
        return ""


# --- Extract Name & Email ---
def extract_email_and_name(file_path):
    text = extract_text_from_pdf(file_path)
    print("\nExtracted Text Preview:\n", text[:500])  # Optional for debugging

    # Email extraction
    emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text)
    email = emails[0] if emails else None
    print("Extracted emails:", emails)

    # Name extraction
    name_match = re.search(r'(?:Name[:\-]?\s*)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)', text)
    if name_match:
        name = name_match.group(1)
    else:
        words = text.strip().split()
        name = f"{words[0]} {words[1]}" if len(words) >= 2 else "Candidate"

    print(f"Extracted name: {name}, email: {email}")
    return name, email


# --- Rank Resumes Main Function ---
def rank_resumes(folder_path, job_description, method="tfidf"):
    if method.lower() == "bert":
        return rank_with_bert(folder_path, job_description)
    else:
        return rank_with_tfidf(folder_path, job_description)


# --- TF-IDF Similarity Ranking ---
def rank_with_tfidf(folder_path, job_description):
    resume_scores = []
    file_list = os.listdir(folder_path)

    for filename in file_list:
        if not filename.endswith(".pdf"):
            continue
        file_path = os.path.join(folder_path, filename)
        resume_text = extract_text_from_pdf(file_path)

        if not resume_text.strip():
            continue

        tfidf = TfidfVectorizer(stop_words='english')
        try:
            vectors = tfidf.fit_transform([resume_text, job_description])
            score = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
            resume_scores.append({
                "filename": filename,
                "score": round(score * 100, 2)
            })
        except Exception as e:
            print(f"Error computing TF-IDF similarity for {filename}: {e}")

    return sorted(resume_scores, key=lambda x: x["score"], reverse=True)


# --- BERT Similarity Ranking ---
def rank_with_bert(folder_path, job_description):
    job_emb = bert_model.encode(job_description, convert_to_tensor=True)
    scores = []

    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            text = extract_text_from_pdf(file_path)
            if not text.strip():
                continue

            try:
                resume_emb = bert_model.encode(text, convert_to_tensor=True)
                sim_score = util.cos_sim(job_emb, resume_emb).item()
                scores.append({
                    "filename": filename,
                    "score": round(sim_score * 100, 2)
                })
            except Exception as e:
                print(f"Error computing BERT similarity for {filename}: {e}")

    return sorted(scores, key=lambda x: x["score"], reverse=True)
