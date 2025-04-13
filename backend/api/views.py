from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse, JsonResponse
from .transcriber import transcribe_audio
from .responder import get_gemini_response
from .synthesizer import synthesize_speech_bytes
from base64 import b64encode

class VoiceAssistantAPIView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        audio_file = request.FILES.get("audio")
        if not audio_file:
            return Response({"error": "No audio file provided"}, status=400)

        try:
            print("Received audio file")  # Debugging line to check if the file is received
            transcript = transcribe_audio(audio_file)
            print("Transcription complete")  # Debugging line to check transcription
            print(transcript)  # Debugging line to check the transcript
            reply = get_gemini_response(transcript)
            print(reply) # Debugging line to check the reply
            mp3_bytes = synthesize_speech_bytes(reply)
            print("MP3 bytes generated")  # Debugging line to check MP3 generation

            audio_base64 = b64encode(mp3_bytes).decode("utf-8")
            return Response({
                "transcript": transcript,
                "reply": reply,
                "audio_base64": audio_base64
            })
        except Exception as e:
            print(f"Error occurred: {e}")
            return JsonResponse({"error": str(e)}, status=500)
