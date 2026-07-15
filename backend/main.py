from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from services.orchestrate import chat_with_agent

app = FastAPI(
    title="Interview Trainer API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
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

    prompt = f"""
Candidate Name: {data.name}
Role: {data.role}
Experience: {data.experience}
Interview Type: {data.interviewType}

Act as a professional interviewer.

Start the interview.

Ask exactly ONE question.

Do not reveal future questions.

Wait for the user's answer before continuing.
"""

    response = chat_with_agent(prompt)

    return response

class ChatRequest(BaseModel):
    answer: str
    thread_id: str | None = None
    previous_question: str

@app.post("/chat")
def chat(data: ChatRequest):

    prompt = f"""
You are conducting a mock interview.

The previous interview question was:

{data.previous_question}

The candidate answered:

{data.answer}

First evaluate ONLY the candidate's answer.

Return:

Score: x/10

Strengths:
- ...

Improvements:
- ...

Then ask ONE NEW interview question.

Rules:
- Never repeat the previous question.
- Never ask "Tell me about yourself" again.
- Increase difficulty gradually.
- Continue the interview naturally.
- Do not greet the candidate again.
- Do not restart the interview.
"""
    return chat_with_agent(prompt, data.thread_id)