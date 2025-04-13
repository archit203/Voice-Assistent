import React, { useRef, useState } from "react";
import axios from "axios";

function VoiceRecorder({ onResponse, setIsProcessing }) {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "audio.webm");

        try {
          const res = await axios.post("http://localhost:8000/api/voice/", formData);
          const { transcript, reply, audio_base64 } = res.data;

          const audioBlob = new Blob(
            [Uint8Array.from(atob(audio_base64), c => c.charCodeAt(0))],
            { type: "audio/mpeg" }
          );
          const audioURL = URL.createObjectURL(audioBlob);

          onResponse({ transcript, reply, audioURL });
          setIsProcessing(false);
        } catch (error) {
          console.error("Error sending audio to backend:", error);
        }

        // Clean up the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Fallback in case onstop doesn't trigger (some mobile bugs)
      // setTimeout(() => {
      //   if (mediaRecorder.state === "recording") {
      //     mediaRecorder.stop();
      //     setIsRecording(false);
      //     setIsProcessing(true);
      //   }
      // }, 2000); // 2s fallback
    } catch (err) {
      console.error("Microphone access denied or error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        className={`px-6 py-3 rounded-full text-white transition ${
          isRecording ? "bg-slate-700" : "bg-black"
        }`}
      >
        {isRecording ? "Listening..." : "Hold to Talk"}
      </button>
    </div>
  );
}

export default VoiceRecorder;
