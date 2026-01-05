import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* 🔐 TEKAN 'N' DUA KALI → HALAMAN DEVOTIONAL */
  useEffect(() => {
    let nCount = 0;
    let nTimer;

    const handleNShortcut = (e) => {
      if (e.key.toLowerCase() === "n") {
        nCount++;
        clearTimeout(nTimer);

        nTimer = setTimeout(() => {
          nCount = 0;
        }, 500);

        if (nCount === 2) {
          navigate("/devotional");
          nCount = 0;
        }
      }
    };

    window.addEventListener("keydown", handleNShortcut);
    return () => {
      window.removeEventListener("keydown", handleNShortcut);
      clearTimeout(nTimer);
    };
  }, [navigate]);

  /* 🔑 LOGIN */
  const handleLogin = async () => {
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Nama dan kata sandi tidak boleh kosong");
      return;
    }

    try {
      const res = await axios.post(
        "https://lbackend-2.onrender.com/login",
        {
          username: username.trim(),
          password: password.trim(),
        }
      );

      if (res.data.success) {
        sessionStorage.clear();
        sessionStorage.setItem("isAuth", "true");
        sessionStorage.setItem("name", username.trim().toLowerCase());

        navigate("/love");
      } else {
        setError("Nama atau kata sandi salah");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan pada server");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </h1>

        <p style={styles.subtitle}>
          Masuk untuk belajar, merenung,  
          dan mendekat kepada Allah SWT
        </p>

        <input
          style={styles.input}
          type="text"
          placeholder="Nama pengguna"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Kata sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button style={styles.loginBtn} onClick={handleLogin}>
          Masuk Untuk Menuntut Ilmu
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.hint}>
          Tekan huruf <b>N</b> dua kali untuk masuk ke halaman dzikir
        </p>
      </div>
    </div>
  );
}

export default Login;
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #064e3b, #022c22)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, Segoe UI, sans-serif",
    padding: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(14px)",
    padding: "40px",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "360px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
  },
  title: {
    color: "#fbbf24",
    fontSize: "22px",
    marginBottom: "14px",
    fontFamily: "'Amiri', serif",
  },
  subtitle: {
    color: "#ecfeff",
    fontSize: "14px",
    marginBottom: "25px",
    lineHeight: "1.6",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  loginBtn: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    border: "none",
    borderRadius: "30px",
    color: "#1f2937",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "5px",
    boxShadow: "0 10px 25px rgba(251,191,36,0.35)",
  },
  error: {
    marginTop: "14px",
    color: "#fecaca",
    fontSize: "13px",
  },
  hint: {
    marginTop: "20px",
    fontSize: "11px",
    opacity: 0.7,
    color: "#ecfeff",
    letterSpacing: "1px",
  },
};
