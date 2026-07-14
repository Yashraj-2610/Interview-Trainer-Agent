import os
import requests
from dotenv import load_dotenv

load_dotenv()

IBM_URL = os.getenv("IBM_URL")
API_KEY = os.getenv("IBM_API_KEY")
PROJECT_ID = os.getenv("IBM_PROJECT_ID")


def get_token():
    url = "https://iam.cloud.ibm.com/identity/token"

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    data = {
        "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        "apikey": API_KEY
    }

    response = requests.post(url, headers=headers, data=data)

    response.raise_for_status()

    return response.json()["access_token"]


def generate_questions(name, role, experience, interview_type):

    token = get_token()

    endpoint = f"{IBM_URL}/ml/v1/text/chat?version=2025-02-11"

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    prompt = f"""
You are an expert interview trainer.

Generate exactly 5 interview questions.

Candidate: {name}
Role: {role}
Experience: {experience}
Interview Type: {interview_type}

Return ONLY the questions.
"""

    payload = {
        "model_id": "openai/gpt-oss-120b",
        "project_id": PROJECT_ID,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }

    response = requests.post(
        endpoint,
        headers=headers,
        json=payload
    )

    print(response.status_code)
    print(response.text)

    return response.json()