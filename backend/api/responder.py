
from google import genai
import os
from dotenv import load_dotenv
import markdown
from bs4 import BeautifulSoup

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)


def get_gemini_response(prompt):
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    html_content = markdown.markdown(response.text)
    soup = BeautifulSoup(html_content, "html.parser")
    plain_text = soup.get_text()
    return plain_text
