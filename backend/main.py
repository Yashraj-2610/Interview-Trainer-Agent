from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Interview Trainer API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InterviewRequest(BaseModel):
    name: str
    role: str
    experience: str
    interviewType: str


@app.get("/")
def home():
    return {
        "status": "running",
        "message": "Interview Trainer Backend"
    }


@app.post("/generate-interview")
def generate_interview(data: InterviewRequest):

    return {
        "candidate": data.name,
        "role": data.role,
        "experience": data.experience,
        "interview_type": data.interviewType,
        "questions": [
            f"Tell me about yourself as a {data.role}.",
            f"What projects have you completed as a {data.role}?",
            "Explain one challenging situation you faced.",
            "Why do you want this job?",
            "Where do you see yourself in 5 years?"
        ]
    }