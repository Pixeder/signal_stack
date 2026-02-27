import requests

# ⚠️ Paste your new Ngrok URL here
API_URL = "https://unparasitic-denese-caressive.ngrok-free.dev/api/generate"

# The data we are sending
payload = {
    "model": "llama3",
    "prompt": "Why did the developer switch from Localtunnel to Ngrok?",
    "stream": False
}

print("Sending fast request via Ngrok...")

# Sending the clean POST request
response = requests.post(API_URL, json=payload)

# Printing the model's answer
if response.status_code == 200:
    data = response.json()
    print("\nModel says:", data['response'])
else:
    print("\nError:", response.status_code, response.text)