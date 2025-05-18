from pymongo import MongoClient

#connecct to mongo db
client=MongoClient('localhost',27017)

#create database
db=client["rankedResume"]

#create Collection
resumes_collection=db["resumes"]
hr_collection=db["hr_decisions"]
