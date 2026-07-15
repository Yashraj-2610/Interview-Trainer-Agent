import os
from urllib import response
import requests
from dotenv import load_dotenv

load_dotenv()

INSTANCE_URL = os.getenv("INSTANCE_URL")
API_KEY = os.getenv("IBM_API_KEY")
AGENT_ID = os.getenv("AGENT_ID")


def get_token():
    response = requests.post(
        "https://iam.cloud.ibm.com/identity/token",
        headers={
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data={
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": API_KEY
        }
    )

    return response.json()["access_token"]


def chat_with_agent(prompt, thread_id=None):

    token = get_token()

    url = f"{INSTANCE_URL}/v1/orchestrate/{AGENT_ID}/chat/completions"

    payload = {
        "stream": False,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }


    if thread_id:
        payload["thread_id"] = thread_id

    response = requests.post(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        },
        json=payload
    )

    print("Status:", response.status_code)
    print(response.text)

    return response.json()