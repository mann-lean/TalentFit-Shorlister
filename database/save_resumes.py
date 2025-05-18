from database.db_config import resumes_collection

def saved_ranked_resumes(ranked_resumes,job_description):
    job_entry={
        "job_description":job_description,
        "resumes":ranked_resumes
    }
    resumes_collection.insert_one(job_entry)
    print("✅ Ranked resumes saved to database!")
