import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Devotional.css";

function Devotional() {
  const navigate = useNavigate();

  useEffect(() => {
    let pCount = 0;
    let pTimer;
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "p") {
        pCount++;
        clearTimeout(pTimer);
        pTimer = setTimeout(() => { pCount = 0; }, 500);
        if (pCount === 2) { 
          navigate("/login"); 
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
      {/* 🟢 TOP NAVIGATION BAR */}
      <nav className="devotional-nav">
        <div className="nav-container">
          <span className="nav-logo">Ma'rifatullah</span>
          <button className="nav-login-btn" onClick={() => navigate("/login")}>
            Masuk Aplikasi
          </button>
        </div>
      </nav>

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

        {/* SECTION: TAUHID CORE */}
        <div className="devotional-cards">
          <div className="devotional-card">
            <span className="icon">🕌</span>
            <h4>Tauhid Uluhiyyah</h4>
            <p>Mengesakan Allah dalam segala bentuk ibadah kita hanya untuk-Nya semata.</p>
          </div>
          <div className="devotional-card">
            <span className="icon">✨</span>
            <h4>Asmaul Husna</h4>
            <p>Memahami sifat-sifat Allah yang sempurna untuk mempertebal rasa takut dan cinta.</p>
          </div>
          <div className="devotional-card">
            <span className="icon">🌿</span>
            <h4>Rububiyyah</h4>
            <p>Meyakini Allah sebagai satu-satunya Pencipta, Pemilik, dan Pengatur alam semesta.</p>
          </div>
        </div>

        {/* SECTION: LIBRARY */}
        <div className="books-section">
          <h3 className="section-subtitle">📚 Perpustakaan Tauhid</h3>
          <p className="section-desc">Pelajari kitab-kitab para ulama untuk mengenal Sang Khaliq lebih dekat</p>
          <div className="books-grid">
            <div className="book-card">
              <span className="book-icon">📜</span>
              <h4>Kitab Al-Hikam</h4>
              <p>Mempelajari rahasia ikhlas dan adab seorang hamba saat menghadap Allah dalam setiap keadaan.</p>
            </div>
            <div className="book-card">
              <span className="book-icon">📖</span>
              <h4>Aqidatul Awam</h4>
              <p>Dasar-dasar pengetahuan tentang sifat wajib, mustahil, dan jaiz bagi Allah dan para Rasul.</p>
            </div>
            <div className="book-card">
              <span className="book-icon">📗</span>
              <h4>Fathul Majid</h4>
              <p>Penjelasan mendalam mengenai kemurnian tauhid dan bahaya kesyirikan dalam hati.</p>
            </div>
          </div>
        </div>

        {/* SECTION: ADDITIONAL MATTER */}
        <div className="study-section">
          <h3>Mutiara Hikmah Ma'rifat</h3>
          <p className="wisdom-text">
            "Siapa yang mengenal dirinya, maka ia akan mengenal Tuhannya." 
            Mengenal Allah bukan sekadar menghafal nama-Nya, melainkan merasakan kehadiran-Nya 
            dalam setiap detak jantung dan hembusan nafas kita.
          </p>
          <ul className="study-list">
            <li><span>🌙</span> Dzikir Nafas & Sirr (Rahasia Hati)</li>
            <li><span>🕌</span> Shalat Awwabin & Tahajjud Sepertiga Malam</li>
            <li><span>🤍</span> Tadabbur Ayat-Ayat Kauniyah (Alam Semesta)</li>
            <li><span>📿</span> Istighfar & Taubat Nasuha Setiap Hari</li>
            <li><span>🌱</span> Menanamkan Sifat Qana'ah & Syukur</li>
            <li><span>🤝</span> Menebar Kasih Sayang (Rahmatan Lil Alamin)</li>
          </ul>
        </div>

        <div className="footer-area">
          <div className="shortcut-hint">
            Tekan <b>P</b> dua kali untuk akses rahasia
          </div>
          <p>© 2026 Perjalanan Menuju Ridha Allah</p>
        </div>
      </div>
    </div>
  );
}

export default Devotional;