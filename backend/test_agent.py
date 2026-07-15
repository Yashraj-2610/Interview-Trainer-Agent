import requests

API_KEY = "GhtTWqjvaJe3k4uoX7Td1DE8jEiJN-Yegaayum7W2qAH"

INSTANCE_URL = "https://api.au-syd.watson-orchestrate.cloud.ibm.com/instances/2ec3766c-9424-4907-8411-b3ea56d915be"

AGENT_ID = "ddfdd62b-a51f-4c67-9667-d9087d66dcfa"


# ------------------------
# STEP 1: Get IAM Token
# ------------------------

token = requests.post(
    "https://iam.cloud.ibm.com/identity/token",
    headers={
        "Content-Type": "application/x-www-form-urlencoded"
    },
    data={
        "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        "apikey": API_KEY
    }
)

print("IAM:", token.status_code)
print(token.text)

if token.status_code != 200:
    print("Failed to get IAM token")
    exit()

access_token = token.json()["access_token"]

# ------------------------
# STEP 2: Chat with Agent
# ------------------------

url = f"{INSTANCE_URL}/v1/orchestrate/{AGENT_ID}/chat/completions"

payload = {
    "stream": False,
    "messages": [
        {
            "role": "user",
            "content": "Generate 5 interview questions for a Python Developer with 0-2 years of experience."
        }
    ]
}

response = requests.post(
    url,
    headers={
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    },
    json=payload
)

print("URL:", url)
print("Status:", response.status_code)
print(response.text)