from fastapi import FastAPI

app = FastAPI(
    title="Interview Trainer API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "status": "running",
        "message": "Interview Trainer Backend"
    }
