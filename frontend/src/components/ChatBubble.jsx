import React from "react";

function ChatBubble({ sender, content, timestamp, type, audioURL, audioRef }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-sm rounded-lg p-3 shadow ${isUser ? "bg-black text-white rounded-tr-none" : "bg-gray-200 text-black rounded-tl-none"}`}>
        <p className="text-sm">{content}</p>
        {type === "audio" && (
          <audio controls autoPlay className="mt-2 w-full" ref={sender === "assistant" ? audioRef : null}>
            <source src={audioURL} type="audio/mpeg" />
            Your browser does not support audio playback.
          </audio>
        )}
        <p className="text-[10px] text-right opacity-60 mt-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

export default ChatBubble;
