import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./CustomerInqChatPage.scss";

const API_URL = "https://gen-z-back.vercel.app";

const CustomerInqChatPage = () => {
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const lastTimestamps = useRef({});

  // Poll for users and new messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Fetch active users
        const { data: userList } = await axios.get(`${API_URL}/chat/users`);
        setUsers(userList);

        // Poll new messages for the selected user
        if (selectedUser) {
          const since = lastTimestamps.current[selectedUser] || 0;
          const { data: newMsgs } = await axios.get(
            `${API_URL}/chat/poll/${selectedUser}?since=${since}`,
          );
          if (newMsgs.length > 0) {
            setMessages((prev) => {
              const existing = prev[selectedUser] || [];
              // Only add messages we don't already have locally
              const userNewMsgs = newMsgs.filter((m) => m.sender === "user");
              return { ...prev, [selectedUser]: [...existing, ...userNewMsgs] };
            });
            lastTimestamps.current[selectedUser] = Math.max(
              ...newMsgs.map((m) => m.timestamp),
            );
          }
        }
      } catch (err) {
        // ignore polling errors
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  const handleUserSelect = async (userId) => {
    setSelectedUser(userId);
    try {
      const { data: history } = await axios.get(
        `${API_URL}/chat/history/${userId}`,
      );
      setMessages((prev) => ({ ...prev, [userId]: history }));
      if (history.length > 0) {
        lastTimestamps.current[userId] = Math.max(
          ...history.map((m) => m.timestamp),
        );
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
    }
  };

  const handleSend = () => {
    if (message.trim() === "" || !selectedUser) return;

    axios
      .post(`${API_URL}/chat/admin-reply`, {
        text: message,
        userId: selectedUser,
      })
      .catch(() => {});

    setMessages((prev) => ({
      ...prev,
      [selectedUser]: [
        ...(prev[selectedUser] || []),
        { text: message, sender: "admin", timestamp: Date.now() },
      ],
    }));
    setMessage("");
  };

  return (
    <div className="admin-chat-container">
      <h3>Admin Chat</h3>

      <div className="user-list">
        <h4>Users :</h4>
        {users.length === 0 ? (
          <p>No users yet</p>
        ) : (
          users.map((userId) => (
            <button key={userId} onClick={() => handleUserSelect(userId)}>
              {userId}
            </button>
          ))
        )}
      </div>

      <div className="chat-box">
        <h4>Chat with: {selectedUser || "Select a User"}</h4>
        <div className="chat-messages">
          {(messages[selectedUser] || []).map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "admin" ? "admin-message" : "user-message"
              }
            >
              {msg.sender === "admin"
                ? `Admin: ${msg.text}`
                : `User: ${msg.text}`}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Reply..."
        />
        <button onClick={handleSend} disabled={!selectedUser}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CustomerInqChatPage;
