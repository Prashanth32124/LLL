import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Devotional.css";

function Devotional() {
  const navigate = useNavigate();

  /* 🔑 PRESS 'P' TWICE → LOGIN */
  useEffect(() => {
    let pCount = 0;
    let pTimer;

    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "p") {
        pCount++;
        clearTimeout(pTimer);

        pTimer = setTimeout(() => {
          pCount = 0;
        }, 500);

        if (pCount === 2) {
          navigate("/");
          pCount = 0;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(pTimer);
    };
  }, [navigate]);

  return (
    <div className="devotional-wrapper">
      <div className="overlay-gradient"></div>

      <div className="devotional-content">
        <h1 className="bismillah-text">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </h1>

        <div className="central-frame">
          <div className="allah-kaligrafi">الله</div>
        </div>

        <h2 className="devotional-title">
          Mengenal Keagungan Allah SWT
        </h2>

        <p className="verse-text">
          "Dia-lah Allah, yang tidak ada Tuhan selain Dia. Raja, Yang Maha Suci,
          Yang Maha Sejahtera, Yang Menjaga Keamanan, Yang Memelihara Keselamatan."
          <br />
          <span>(QS. Al-Hasyr: 23)</span>
        </p>

        {/* STUDY CARDS */}
        <div className="devotional-cards">
          <div className="devotional-card">
            <span className="icon">📖</span>
            <h4>Ilmu yang Bermanfaat</h4>
            <p>Ilmu adalah cahaya yang menerangi hati dan kehidupan.</p>
          </div>

          <div className="devotional-card">
            <span className="icon">🤲</span>
            <h4>Keikhlasan</h4>
            <p>Semua amal bernilai jika dilakukan karena Allah.</p>
          </div>

          <div className="devotional-card">
            <span className="icon">💖</span>
            <h4>Kasih Sayang</h4>
            <p>Rahmat Allah meliputi seluruh alam semesta.</p>
          </div>
        </div>

        {/* STUDY SECTION */}
        <div className="study-section">
          <h3>Apa yang Perlu Kita Pelajari?</h3>
          <ul>
            <li>🌙 Makna Asmaul Husna dalam kehidupan</li>
            <li>🕌 Menjaga shalat dan adab kepada Allah</li>
            <li>🤍 Membersihkan hati dari iri dan sombong</li>
            <li>📿 Menjadikan dzikir sebagai penenang jiwa</li>
            <li>🌿 Menumbuhkan sabar dan tawakkal</li>
          </ul>

          <p className="study-note">
            Ilmu bukan hanya untuk diketahui,  
            tetapi untuk diamalkan setiap hari.
          </p>
        </div>

        {/* LOGIN BUTTON */}
        <div className="action-area">
          <button
            className="devotional-login-btn"
            onClick={() => navigate("/login")}
          >
            Masuk Ke Aplikasi
          </button>
        </div>

        <div className="shortcut-hint">
          Tekan huruf <b>P</b> dua kali untuk masuk
        </div>
      </div>
    </div>
  );
}

export default Devotional;
