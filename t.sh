curl https://api.cracked.systems/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer J1aKnEW7GnC4vpuw" \
  -d '{
    "model": "claude-3.5-sonnet",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ],
    "temperature": 0.7
  }'