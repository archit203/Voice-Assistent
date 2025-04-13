from gtts import gTTS
import io

def synthesize_speech_bytes(text):
    tts = gTTS(text, lang='en')
    buffer = io.BytesIO()
    tts.write_to_fp(buffer)
    buffer.seek(0)
    return buffer.read()
