import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!username || !password) {
      setError("Username and password cannot be empty 💔");
      return;
    }

    try {
      const res = await axios.post("https://rp2backend.vercel.app/login", {
        username: username.trim(),
        password: password.trim(),
      });

      if (res.data.success) {
        sessionStorage.clear();
        sessionStorage.setItem("name", username);
        sessionStorage.setItem("token", "yes");
        alert("Welcome my love ❤️");
        navigate("/love");
      } else {
        setError(res.data.message || "Login failed 💔");
      }
    } catch (err) {
      setError("Something went wrong 💔");
    }
  };


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>💖 Welcome Back 💖</h1>
        <p style={styles.subtitle}>Enter your heart’s credentials</p>

        <input
          style={styles.input}
          type="text"
          placeholder="Your name 🫶"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Love password ❤️"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.loginBtn} onClick={handleLogin}>
          Enter My Heart ❤️
        </button>


        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "20px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },

  title: {
    color: "#fff",
    marginBottom: "10px",
    fontSize: "26px",
  },

  subtitle: {
    color: "#ffe6f0",
    marginBottom: "25px",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },

  loginBtn: {
    width: "100%",
    padding: "12px",
    background: "#ff4d88",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "0.3s",
  },

  adminBtn: {
    width: "100%",
    padding: "10px",
    background: "transparent",
    border: "1px solid #fff",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "13px",
    cursor: "pointer",
  },

  error: {
    marginTop: "15px",
    color: "#ffe6e6",
    fontSize: "13px",
  },
};
