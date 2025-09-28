import React, { useState } from "react";
import chatbotData from "../assets/chatbotData";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSend = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: userInput }];

    // 🆕 Improved matching logic
    const reply = chatbotData.find(item =>
      userInput.toLowerCase().includes(item.question.toLowerCase())
    );

    const botReply = reply
      ? reply.answer
      : "🤔 Sorry, I’m not sure about that. Could you rephrase your question?";

    // Add bot response
    newMessages.push({ sender: "bot", text: botReply });
    setMessages(newMessages);
    setUserInput("");
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Toggle Button */}
      <button
        className="bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬 Chat
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white shadow-xl rounded-lg w-80 h-96 mt-2 flex flex-col border border-gray-300">
          <div className="bg-pink-600 text-white p-3 rounded-t-lg font-bold">
            Your Tailor Assistant
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-gray-200 self-end ml-auto"
                    : "bg-pink-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-2 flex border-t">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 p-2 border rounded-l"
            />
            <button
              onClick={handleSend}
              className="bg-pink-600 text-white px-3 rounded-r"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
