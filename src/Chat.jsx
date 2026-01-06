import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./services/socket";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import "./CSS/chat.css";

const ALL_USERS = ["ajuma", "prashu"];
const MAX_FILE_SIZE = 32 * 1024 * 1024; // 32MB
const IMGBB_API_KEY = "263b2b043b262a89db8eba7db5ca3539"; // ⚠️ Public key

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [onlineList, setOnlineList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ✅ EDIT STATE (ADDED)
  const [editingId, setEditingId] = useState(null);

  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const name = (sessionStorage.getItem("name") || "").toLowerCase().trim();

  /* 🔑 PRESS 'N' TWICE → DEVOTIONAL */
  useEffect(() => {
    let sCount = 0;
    let sTimer;

    const handleSKey = (e) => {
      if (e.key.toLowerCase() === "n") {
        sCount++;
        clearTimeout(sTimer);

        sTimer = setTimeout(() => {
          sCount = 0;
        }, 500);

        if (sCount === 2) {
          navigate("/devotional");
          sCount = 0;
        }
      }
    };

    window.addEventListener("keydown", handleSKey);
    return () => {
      window.removeEventListener("keydown", handleSKey);
      clearTimeout(sTimer);
    };
  }, [navigate]);

  /* 🔽 AUTO SCROLL */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isUploading]);

  /* 🔽 SOCKET + LOAD MSGS */
  useEffect(() => {
    axios
      .get("https://lbackend-2.onrender.com/api/messages")
      .then((res) => setMessages(res.data));

    socket.emit("joinChat", name);

    socket.on("receiveMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    // ✅ LISTEN FOR EDITED MESSAGE (ADDED)
    socket.on("messageEdited", ({ id, content }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, content, edited: true } : m
        )
      );
    });

    socket.on("updateUserStatus", (users) =>
      setOnlineList(users)
    );

    return () => {
      socket.off("receiveMessage");
      socket.off("messageEdited");
      socket.off("updateUserStatus");
    };
  }, [name]);

  /* ===================== TIME & DATE HELPERS ===================== */
  const formatTime = (time) => {
    if (!time) return "";
    const d = new Date(time);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getDateLabel = (date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a, b) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();

    if (isSameDay(d, today)) return "Today";
    if (isSameDay(d, yesterday)) return "Yesterday";

    return d.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ===================== IMAGE HANDLING ===================== */
  const convertToJpeg = (inputFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(inputFile);

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext("2d").drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (!blob) return reject("Conversion failed");
              resolve(new File([blob], "image.jpg", { type: "image/jpeg" }));
            },
            "image/jpeg",
            0.8
          );
        };
      };
      reader.onerror = reject;
    });

  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData,
      {
        onUploadProgress: (p) =>
          setUploadProgress(Math.round((p.loaded * 100) / p.total)),
      }
    );

    return res.data.data.url;
  };

  /* ===================== SEND / EDIT MESSAGE ===================== */
  const sendMessage = async () => {
    if (!message.trim() && !file) return;

    // ✅ EDIT MODE (ADDED)
    if (editingId) {
      socket.emit("editMessage", {
        id: editingId,
        content: message,
      });

      setEditingId(null);
      setMessage("");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      let mediaUrl = null;

      if (file) {
        const converted = await convertToJpeg(file);
        if (converted.size > MAX_FILE_SIZE) {
          alert("Image too large even after compression");
          return;
        }
        mediaUrl = await uploadToImgBB(converted);
      }

      socket.emit("sendMessage", {
        sender: name,
        content: message,
        image: mediaUrl,
        video: null,
        time: new Date().toISOString(),
      });

      setMessage("");
      setFile(null);
      setFilePreview(null);
      setShowEmoji(false);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  /* ===================== RENDER ===================== */
  let lastDate = "";

  return (
    <div className="chat-page-wrapper">
      <div className="chat-container">

        {/* HEADER */}
        <div className="chat-header">
          <span className="header-title">❤️ Our Private Space ❤️</span>
          <div className="users-status-row">
            {ALL_USERS.map((user) => (
              <div key={user} className="user-online-item">
                <span
                  className={`status-dot ${
                    onlineList.includes(user.toLowerCase())
                      ? "online"
                      : "offline"
                  }`}
                ></span>
                <span className="user-name-label">{user}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MESSAGES */}
        <div className="chat-messages" ref={scrollRef}>
          {messages.map((msg, i) => {
            const msgDate = msg.time || msg.createdAt;
            const dateLabel = getDateLabel(msgDate);
            const showDate = dateLabel !== lastDate;
            lastDate = dateLabel;

            return (
              <React.Fragment key={msg._id || i}>
                {showDate && (
                  <div className="date-separator">{dateLabel}</div>
                )}

                <div
                  className={msg.sender === name ? "message own" : "message"}
                >
                  <div className="message-info">
                    <strong>{msg.sender}</strong>
                    <span className="message-time">
                      {formatTime(msgDate)} {msg.edited && "(edited)"}
                    </span>
                  </div>

                  <div className="message-content">
                    {msg.content && <p>{msg.content}</p>}
                    {msg.image && (
                      <img
                        src={msg.image}
                        className="chat-media"
                        alt="shared"
                      />
                    )}

                    {/* ✏️ EDIT BUTTON (ONLY OWN TEXT MSG) */}
                    {msg.sender === name && msg.content && (
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditingId(msg._id);
                          setMessage(msg.content);
                        }}
                      >
                        ✏️ Edit
                      </button>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {isUploading && (
            <div className="loading-status">
              Processing {uploadProgress}% 🚀
            </div>
          )}
        </div>

        {/* PREVIEW */}
        {filePreview && (
          <div className="preview-bar">
            <img src={filePreview} width="50" alt="" />
            <button onClick={() => { setFile(null); setFilePreview(null); }}>
              ✕
            </button>
          </div>
        )}

        {/* EMOJI */}
        {showEmoji && (
          <div className="emoji-picker-container">
            <EmojiPicker
              onEmojiClick={(e) =>
                setMessage((prev) => prev + e.emoji)
              }
              width="100%"
              height="350px"
            />
          </div>
        )}

        {/* INPUT */}
        <div className="chat-input-area">
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="emoji-btn"
          >
            😊
          </button>

          <label className="file-label">
            📷
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files[0];
                if (f) {
                  setFile(f);
                  setFilePreview(URL.createObjectURL(f));
                }
              }}
            />
          </label>

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              editingId ? "Edit your message..." : "Write a love note..."
            }
            disabled={isUploading}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            autoComplete="off"
          />

          <button
            onClick={sendMessage}
            disabled={isUploading}
            className="send-btn"
          >
            {editingId ? "Update" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
