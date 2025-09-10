import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import ChatBubble from "./ChatbotBubble";
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function ChatbotForm({ onClose }) {
  
  const UserAvatar = () => (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
      <svg
        className="w-6 h-6 text-gray-500"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );

  const BotAvatar = () => (
    <div 
      className="w-10 h-10 rounded-full bg-purple-700 backdrop-blur-sm flex items-center justify-center"
      role="img"
      aria-label="AI Assistant Avatar"
    >
      <svg
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.5475 17.2484C21.7099 17.9924 19.7264 18.4513 17.6518 18.5702C17.294 18.5907 16.9335 18.6011 16.5706 18.6011C16.2077 18.6011 15.8472 18.5907 15.4894 18.5702C13.4143 18.4513 11.4304 17.9922 9.59245 17.2479C5.7354 15.6859 2.52144 12.8676 0.458008 9.30056C3.67423 3.74067 9.68559 0 16.5706 0C23.4557 0 29.467 3.74067 32.6833 9.30056C30.6196 12.868 27.4051 15.6865 23.5475 17.2484Z"
          fill="white"
        />
        <path
          d="M9.5925 18.6958C9.14816 18.5158 8.71235 18.3192 8.28585 18.1067C6.89977 19.0831 5.72802 20.2992 4.8457 21.6866C6.34541 24.0449 8.68132 25.9082 11.4846 26.9409C12.8204 27.433 14.2624 27.7365 15.7706 27.8151H17.3422C18.85 27.7365 21.5002 29.2303 17.6519 32.9999C20.4556 31.9673 26.7672 24.0452 28.267 21.6866C27.3872 20.3032 26.2197 19.09 24.8387 18.115C24.4172 18.3246 23.9865 18.5186 23.5476 18.6963C21.71 19.4403 19.7265 19.8992 17.6519 20.0181C17.2941 20.0386 16.9336 20.049 16.5707 20.049C16.2078 20.049 15.8473 20.0386 15.4895 20.0181C13.4144 19.8992 11.4304 19.4401 9.5925 18.6958Z"
          fill="white"
        />
        <rect x="8.80078" y="6.92139" width="15.573" height="5.5618" rx="2.7809" fill="#162550" />
        <circle cx="20.882" cy="9.67152" r="1.01966" fill="#04FED1" />
        <circle cx="16.5558" cy="23.3905" r="1.01966" fill="#162550" />
        <circle cx="12.4777" cy="9.67152" r="1.01966" fill="#04FED1" />
        <circle cx="12.4777" cy="23.3905" r="1.01966" fill="#162550" />
        <circle cx="20.6349" cy="23.3905" r="1.01966" fill="#162550" />
      </svg>
    </div>
  );
  const TopBotAvatar = () => (
    <div 
      
    >
      <svg
        width="33"
        height="33"
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.5475 17.2484C21.7099 17.9924 19.7264 18.4513 17.6518 18.5702C17.294 18.5907 16.9335 18.6011 16.5706 18.6011C16.2077 18.6011 15.8472 18.5907 15.4894 18.5702C13.4143 18.4513 11.4304 17.9922 9.59245 17.2479C5.7354 15.6859 2.52144 12.8676 0.458008 9.30056C3.67423 3.74067 9.68559 0 16.5706 0C23.4557 0 29.467 3.74067 32.6833 9.30056C30.6196 12.868 27.4051 15.6865 23.5475 17.2484Z"
          fill="white"
        />
        <path
          d="M9.5925 18.6958C9.14816 18.5158 8.71235 18.3192 8.28585 18.1067C6.89977 19.0831 5.72802 20.2992 4.8457 21.6866C6.34541 24.0449 8.68132 25.9082 11.4846 26.9409C12.8204 27.433 14.2624 27.7365 15.7706 27.8151H17.3422C18.85 27.7365 21.5002 29.2303 17.6519 32.9999C20.4556 31.9673 26.7672 24.0452 28.267 21.6866C27.3872 20.3032 26.2197 19.09 24.8387 18.115C24.4172 18.3246 23.9865 18.5186 23.5476 18.6963C21.71 19.4403 19.7265 19.8992 17.6519 20.0181C17.2941 20.0386 16.9336 20.049 16.5707 20.049C16.2078 20.049 15.8473 20.0386 15.4895 20.0181C13.4144 19.8992 11.4304 19.4401 9.5925 18.6958Z"
          fill="white"
        />
        <rect x="8.80078" y="6.92139" width="15.573" height="5.5618" rx="2.7809" fill="#162550" />
        <circle cx="20.882" cy="9.67152" r="1.01966" fill="#04FED1" />
        <circle cx="16.5558" cy="23.3905" r="1.01966" fill="#162550" />
        <circle cx="12.4777" cy="9.67152" r="1.01966" fill="#04FED1" />
        <circle cx="12.4777" cy="23.3905" r="1.01966" fill="#162550" />
        <circle cx="20.6349" cy="23.3905" r="1.01966" fill="#162550" />
      </svg>
    </div>
  );

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);

  const bottomRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/ai/chat", {
        history: [...messages, { from: "user", text: input }],
      });
      const botReply = response.data.reply;
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error talking to Gemini:", error);
      setMessages((prev) => [...prev, { from: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (!hasLoadedHistory) {
      const savedMessages = localStorage.getItem("chatHistory");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([
          { from: "bot", text: "Hi! How can I assist you today?" },
        ]);
      }
      setHasLoadedHistory(true);
    }
  }, [hasLoadedHistory]);

  useEffect(() => {
    if (hasLoadedHistory) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages, hasLoadedHistory]);

  useEffect(() => {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  return (
    <div className="flex flex-col w-[360px] h-[600px] bg-white rounded-3xl border border-solid border-[#979797]" style={{ boxShadow: "0px 10px 4px #0000004D" }}>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#F3A115] p-6 rounded-t-[20px]" style={{ boxShadow: "0px 24px 34px #AE090970" }}>
        <div className="flex items-center gap-2">
          <TopBotAvatar />
          <span className="text-white text-2xl font-bold">Chatbot</span>
        </div>
        <button onClick={onClose}>
          <FaTimes />
          {/* <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dPj38vYMjM/xlas6kmc_expires_30_days.png" className="w-6 h-6 object-fill" alt="Minimize" /> */}
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FA] flex flex-col gap-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} gap-2`}>
            {msg.from === "bot" && (
              // <img
              //   src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/dPj38vYMjM/bxwdn5ym_expires_30_days.png"
              //   className="w-10 h-10 rounded-full bg-[#7B2CBF] p-1 object-fill"
              //   alt="Bot Avatar"
              // />
              <BotAvatar/>
            )}
            <div
              className={`p-3 shadow-sm max-w-[80%] ${
                msg.from === "user"
                  ? "bg-[#DEE2E6] text-[#444444] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                  : "bg-[#3C096C] text-white rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
              }`}
            >
              <span className="whitespace-pre-line">{msg.text}</span>
            </div>
            {msg.from === "user" && <UserAvatar />}
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic">Gemini is typing...</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Chat Input */}
      <div className="flex flex-col bg-white py-4 rounded-b-[20px]" style={{ boxShadow: "0px -4px 16px #00000012" }}>
        <div className="flex items-center self-stretch bg-[#E8EBF0] p-3 mx-4 rounded-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent text-[#444444] text-lg outline-none"
          />
          <button onClick={handleSend} className="flex-shrink-0 ml-2">
            <FaPaperPlane/>
          </button>

        </div>
      </div>
    </div>
  );
}
