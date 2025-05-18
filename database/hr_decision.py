from database.db_config import hr_collection
def save_hr_decision(job_description,resume_name,decision):
    #SAve HR decision as an Acept/Reject
    decision_entry={
        "job_description":job_description,
        "resume_name":resume_name,
        "decision":decision # accept / reject
    }
    save_hr_decision.insert_one(decision)
    print(f"✅ HR marked {resume_name} as {decision}")
    