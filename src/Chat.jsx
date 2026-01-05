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

  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const name = (sessionStorage.getItem("name") || "").toLowerCase().trim();

  /* 🔑 PRESS 'S' TWICE → DEVOTIONAL */
  useEffect(() => {
    let sCount = 0;
    let sTimer;

    const handleSKey = (e) => {
      if (e.key.toLowerCase() === "s") {
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
      .get("http://localhost:5000/api/messages")
      .then((res) => setMessages(res.data));

    socket.emit("joinChat", name);

    socket.on("receiveMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    socket.on("updateUserStatus", (users) =>
      setOnlineList(users)
    );

    return () => {
      socket.off("receiveMessage");
      socket.off("updateUserStatus");
    };
  }, [name]);

  /* 🔽 CONVERT IMAGE TO JPEG */
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

  /* 🔽 IMGBB UPLOAD */
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

  /* 🔽 SEND MESSAGE */
  const sendMessage = async () => {
    if (!message.trim() && !file) return;

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
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.sender === name ? "message own" : "message"}
            >
              <div className="message-info">
                <strong>{msg.sender}</strong>
              </div>
              <div className="message-content">
                {msg.content && <p>{msg.content}</p>}
                {msg.image && (
                  <img src={msg.image} className="chat-media" alt="shared" />
                )}
              </div>
            </div>
          ))}
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
            placeholder={isUploading ? "Wait..." : "Write a love note..."}
            disabled={isUploading}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            disabled={isUploading}
            className="send-btn"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
