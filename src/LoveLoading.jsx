import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoveLoading() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += 2;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigate("/loveajuma");
        }, 1200);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="loading-page">
      {/* Floating hearts */}
      <div className="hearts">
        <span>❤️</span>
        <span>💗</span>
        <span>💖</span>
        <span>🐰</span>
        <span>❤️</span>
      </div>

      {/* Main card */}
      <div className="loading-card">
        <h1 className="title">Preparing Our Love 💕</h1>
        <p className="subtitle">
          Please wait my bunny…<br />
          Our story is loading ✨
        </p>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-text">{progress}%</span>
        </div>

        {progress >= 100 && (
          <h2 className="overload">
            💥 Cuteness Overloaded 🐰❤️
          </h2>
        )}
      </div>

      {/* CSS */}
      <style>{`
        .loading-page {
          height: 100vh;
          background: radial-gradient(circle at top, #ffe0ec, #ffc2d1, #ff9eb5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Poppins", sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Floating hearts */
        .hearts span {
          position: absolute;
          font-size: 28px;
          animation: float 8s infinite ease-in-out;
          opacity: 0.7;
        }

        .hearts span:nth-child(1) { left: 10%; animation-delay: 0s; }
        .hearts span:nth-child(2) { left: 25%; animation-delay: 2s; }
        .hearts span:nth-child(3) { left: 50%; animation-delay: 4s; }
        .hearts span:nth-child(4) { left: 70%; animation-delay: 1s; }
        .hearts span:nth-child(5) { left: 85%; animation-delay: 3s; }

        @keyframes float {
          0% { bottom: -10%; transform: scale(0.8); }
          50% { transform: scale(1.2); }
          100% { bottom: 110%; transform: scale(0.8); }
        }

        /* Card */
        .loading-card {
          background: rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 45px 40px;
          text-align: center;
          box-shadow: 0 25px 60px rgba(255, 70, 120, 0.35);
          animation: popIn 0.7s ease;
          z-index: 2;
        }

        @keyframes popIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .title {
          font-size: 30px;
          font-weight: 800;
          color: #c9184a;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 17px;
          color: #6a1a32;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        /* Progress */
        .progress-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .progress-bar {
          flex: 1;
          height: 14px;
          background: rgba(255,255,255,0.6);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: inset 0 0 6px rgba(0,0,0,0.15);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff4d6d, #ff85a1, #ffb3c6);
          border-radius: 10px;
          transition: width 0.2s ease;
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.6);
        }

        .progress-text {
          font-weight: 700;
          color: #c9184a;
          min-width: 40px;
        }

        .overload {
          margin-top: 25px;
          font-size: 22px;
          font-weight: 900;
          color: #ff1e56;
          animation: bounce 0.6s ease-in-out;
        }

        @keyframes bounce {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
