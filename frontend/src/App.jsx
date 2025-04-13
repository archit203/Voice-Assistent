import React, { useState, useRef, useEffect } from "react";
import VoiceRecorder from "./components/VoiceRecorder";
import ChatBubble from "./components/ChatBubble";
import './App.css';
function App() {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleResponse = ({ transcript, reply, audioURL }) => {
    const userMsg = {
      id: Date.now() + "_user",
      content: transcript,
      type: "text",
      sender: "user",
      timestamp: new Date(),
    };

    const botMsg = {
      id: Date.now() + "_bot",
      content: reply,
      type: "audio",
      audioURL,
      sender: "assistant",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <header className="p-4 bg-black text-white text-xl font-semibold fixed top-0 w-full z-10 flex">
        <img src="image.png" alt="Logo" className="h-8 w-8 inline-block mr-2" />
        Voice Assistant
      </header>

      {/* Scrollable Chat Section */}
      <div className="flex-1 mt-16 mb-24 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} {...msg} />
        ))}
        {isProcessing && (
          <div className="text-sm text-gray-500 animate-pulse flex items-center justify-center w-full">
            <div className="loader mr-2"></div>
            processing ...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Footer */}
      <footer className="p-4 border-t bg-slate-200 fixed bottom-0 w-full z-10">
        <VoiceRecorder onResponse={handleResponse} setIsProcessing={setIsProcessing} />
      </footer>
    </div>
  );
}

export default App;








