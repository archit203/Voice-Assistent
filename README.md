# 🧠 Voice Assistant API Documentation

> **Base URL**: `http://localhost:8000/api/voice/`  
> **Method**: `POST`  
> **Authentication**: ❌ Not required (for local use)  
> **Content-Type**: `multipart/form-data`  
> **Returns**: JSON containing the transcript, AI response, and audio reply in base64

---

## 📡 Endpoint: `POST /api/voice/`

### 🎯 Description
Send a recorded voice audio clip to the backend, and receive:
- ✅ A transcribed text version (using Google ASR)
- 💬 A response generated via LLM (Google Gemini)
- 🔊 An audio reply synthesized with gTTS (as base64)

---

## 📥 Request
Audio File (.webm, .wav or other supported format)

## Response 
## On Success (200)

```bash
{
    "transcrpit": "What is the weather today ?",
    "reply": "Today it's sunny",
    "audio_base64": "<BASE64_ENCODED_MP3_STRING>"
}
```

## On Error (500)
```bash
{
    "error": "No audio file provided"
}
```


