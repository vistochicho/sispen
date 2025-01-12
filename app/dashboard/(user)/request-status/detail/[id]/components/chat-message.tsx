import React from "react";

interface ChatMessageProps {
  avatar: string;
  message: string;
  timestamp: string;
  isUser: boolean;
}

const ChatMessage = ({ avatar, message, timestamp, isUser }: ChatMessageProps) => {
  return (
    <div className={`flex items-start space-x-3 ${isUser ? "justify-end" : ""}`}>
      <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
      <div className={`max-w-xs p-3 rounded-lg ${isUser ? "bg-blue-500 text-white" : "bg-gray-100"}`}>
        <p>{message}</p>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
