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
        {chat.map((msg, index) => (
          <div key={index} style={{
            textAlign: msg.role === "user" ? "right" : "left",
            margin: "10px 0"
          }}>
            <b>{msg.role}:</b>
            <ul>
              <li> {msg.content}</li>
            </ul>
          </div>
        ))}
        {loading && (
    <div className="bot-msg">
      <div className="typing-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )}
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