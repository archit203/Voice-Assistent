import speech_recognition as sr
from pydub import AudioSegment
import io

def transcribe_audio(file_obj):
    # Convert input to mono 16-bit PCM WAV
    audio_data = AudioSegment.from_file(file_obj)
    audio_data = audio_data.set_channels(1).set_frame_rate(16000).set_sample_width(2)

    wav_io = io.BytesIO()
    audio_data.export(wav_io, format="wav")
    wav_io.seek(0)

    recognizer = sr.Recognizer()
    with sr.AudioFile(wav_io) as source:
        audio = recognizer.record(source)
        return recognizer.recognize_google(audio)
