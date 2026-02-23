import React, { useState } from 'react';
import { sendMessage } from './api';
import './chatbot.css'

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { role: "user", content: message };
    setChat((prev) => [...prev, userMsg]);
    setLoading(true);
    setMessage("");
    try {
      const res = await sendMessage({
        userId: "user123",
        message
      });

      const aiMsg = { role: "assistant", content: res.data.reply };
      setChat((prev) => [...prev, aiMsg]);
      
    } catch (err) {
      console.error(err);
    }
     finally {
    setLoading(false); // Hide loader
  }
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>AI Chatbot</h2>

      <div style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
  {chat.map((msg, index) => (
    <li
      key={index}
      style={{
        textAlign: msg.role === "user" ? "right" : "left",
        margin: "10px 0"
      }}
    >
      <b>{msg.role}:</b>
      <div
        style={{
          display: "inline-block",
          background: msg.role === "user" ? "#DCF8C6" : "#f1f1f1",
          padding: "8px 12px",
          borderRadius: "10px",
          maxWidth: "70%"
        }}
      >
        {msg.content}
      </div>
    </li>
  ))}

  {/* Loader as last LI (Perfect placement) */}
  {loading && (
    <li
      style={{
        textAlign: "left",
        margin: "10px 0"
      }}
    >
      <div className="typing-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </li>
  )}
</ul>
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;