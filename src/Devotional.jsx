import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Devotional.css";

function Devotional() {
  const navigate = useNavigate();
  
  let pKeyCount = 0;
  let pKeyTimer;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "p") {
        pKeyCount++;
        clearTimeout(pKeyTimer);
        
        pKeyTimer = setTimeout(() => {
          pKeyCount = 0;
        }, 500);

        if (pKeyCount === 2) {
          navigate("/login");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="devotional-wrapper">
      <div className="overlay-gradient"></div>
      
      <div className="devotional-content">
        <h1 className="bismillah-text">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h1>
        
        <div className="central-frame">
          <div className="allah-kaligrafi">الله</div>
        </div>

        <h2 className="devotional-title">Mengenal Keagungan Allah SWT</h2>
        
        <p className="verse-text">
          "Dia-lah Allah, yang tidak ada Tuhan selain Dia. Raja, Yang Maha Suci, 
          Yang Maha Sejahtera, Yang Menjaga Keamanan, Yang Memelihara Keselamatan." 
          <br /><span>(QS. Al-Hasyr: 23)</span>
        </p>

        <div className="devotional-cards">
          <div className="devotional-card">
            <span className="icon">🤲</span>
            <h4>Maha Pengampun</h4>
            <p>Pintu tobat-Nya selalu terbuka bagi hamba-Nya.</p>
          </div>
          <div className="devotional-card">
            <span className="icon">💖</span>
            <h4>Maha Penyayang</h4>
            <p>Kasih sayang-Nya meliputi segala sesuatu di alam semesta.</p>
          </div>
          <div className="devotional-card">
            <span className="icon">🌿</span>
            <h4>Maha Pemberi Rezeki</h4>
            <p>Tidak ada makhluk melata pun yang luput dari jaminan-Nya.</p>
          </div>
        </div>

        {/* 🔽 ADDED LOGIN BUTTON */}
        <div className="action-area">
          <button className="devotional-login-btn" onClick={() => navigate("/login")}>
            Masuk Ke Aplikasi
          </button>
        </div>

        <div className="shortcut-hint">Tetaplah dalam Dzikir</div>
      </div>
    </div>
  );
}

export default Devotional;