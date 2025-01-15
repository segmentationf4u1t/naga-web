from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="https://api.naga.ac/v1",
)

response = client.chat.completions.create(
    model="gpt-4o-mini-2024-07-18",
    messages=[
        {
            "role": "user",
            "content": "Hello, how are you?",
        }
    ],
)
print(response.choices[0].message.content)
