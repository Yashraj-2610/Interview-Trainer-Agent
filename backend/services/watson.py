import os
from dotenv import load_dotenv

from ibm_watsonx_ai.foundation_models import ModelInference
from ibm_watsonx_ai import Credentials

load_dotenv()

credentials = Credentials(
    url=os.getenv("IBM_URL"),
    api_key=os.getenv("IBM_API_KEY")
)

model = ModelInference(
    model_id="ibm/granite-3-3-8b-instruct",
    credentials=credentials,
    project_id=os.getenv("IBM_PROJECT_ID")
)

def ask_ai(prompt):

    response = model.generate_text(
        prompt=prompt,
        max_new_tokens=700
    )

    return response