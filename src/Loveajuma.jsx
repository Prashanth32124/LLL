import React, { useState } from "react";
import o1 from "./images/Fav/o1.jpg";
import o2 from "./images/Fav/o2.jpg";
import o3 from "./images/Fav/o3.jpg";
import o4 from "./images/Fav/o4.jpg";
import o5 from "./images/Fav/o5.jpg";
import o6 from "./images/Fav/o6.jpg";
import o7 from "./images/Fav/o7.jpg";
import o8 from "./images/Fav/o8.jpg";
import o9 from "./images/Fav/o9.jpg";
import o10 from "./images/Fav/o10.jpg";
import o11 from "./images/Fav/o11.jpg";
import o12 from "./images/Fav/o12.jpg";
import o13 from "./images/Fav/o13.jpg";

import l1 from "./images/l1.jpg";
import l2 from "./images/l2.jpg";
import l3 from "./images/l3.jpg";
import l4 from "./images/l4.jpg";
import l5 from "./images/l5.jpg";
import l6 from "./images/l6.jpg";
import cry from './images/pcr.jpg';
const Loveajuma = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const startDrag = () => setIsDragging(true);
  const stopDrag = () => setIsDragging(false);

  const onDrag = (e) => {
    if (!isDragging) return;
    setRotation((prev) => ({
      x: prev.x + e.movementY * 0.5,
      y: prev.y + e.movementX * 0.5,
    }));
  };
const loveImages = [
  o1,o2,o3,o4,o5,o6,o7,o8,o9,o10,o11,o12,o13
];

const [currentIndex, setCurrentIndex] = useState(0);

const prevImage = () => {
  setCurrentIndex((i) => (i === 0 ? loveImages.length - 1 : i - 1));
};

const nextImage = () => {
  setCurrentIndex((i) => (i === loveImages.length - 1 ? 0 : i + 1));
};

  return (
    <>
      <style>{`
     * {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  margin: 0;
  height: 100vh;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
}

/* ================= MAIN ================= */
.love-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.love-title {
  position: absolute;
  top: 20px;
  font-size: 2.6rem;
  text-shadow: 0 0 15px hotpink;
}

/* ================= LOVE TREE ================= */
.love-tree {
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 260px;
  color: gold;
  font-weight: bold;
  z-index: 10;
}

.tree-line {
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, gold, hotpink);
  border-radius: 2px;
}

.tree-node {
  position: relative;
  padding-left: 30px;
  margin-bottom: 14px;
  font-size: 1.05rem;
  text-shadow: 0 0 8px rgba(255,215,0,0.9);
}

.tree-node::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 7px;
  width: 12px;
  height: 12px;
  background: gold;
  border-radius: 50%;
  box-shadow: 0 0 10px gold;
}

.tree-node small {
  display: block;
  font-size: 0.75rem;
  color: #fff3c4;
}

.tree-separator {
  margin: 8px 0 8px 30px;
  opacity: 0.7;
}

/* ================= PROPOSAL CARD ================= */
/* ================= PROPOSAL CARD ================= */
.proposal-card {
  position: absolute;
  left: 260px;              /* moved LEFT (was 320px) */
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  padding: 18px;

  background: rgba(255, 255, 255, 0.92);  /* WHITE background */
  border-radius: 20px;
  text-align: center;
  z-index: 9;

  box-shadow:
    0 0 15px rgba(255,105,180,0.5),
    0 0 30px rgba(255,215,0,0.4);
}

/* TITLE */
.proposal-title {
  font-size: 1.3rem;
  color: #d4af37; /* gold */
  margin-bottom: 14px;
  text-shadow: none;
}

/* IMAGE */
.proposal-image {
  height: 160px;
  border-radius: 14px;
  border: 2px solid #f4c2c2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  background: #fff5f7;
}

.proposal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

/* TEXT */
.proposal-text {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #444;
}

/* ================= CUBE ================= */
.scene {
  width: 260px;
  height: 260px;
  perspective: 1000px;
  z-index: 5;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  cursor: grab;
}

.cube.auto {
  animation: rotateCube 12s linear infinite;
}

.cube.dragging {
  animation: none;
}

.face {
  position: absolute;
  width: 260px;
  height: 260px;
  background: pink;
  border-radius: 18px;
  overflow: hidden;
}

.face img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.front  { transform: rotateY(0deg) translateZ(130px); }
.back   { transform: rotateY(180deg) translateZ(130px); }
.right  { transform: rotateY(90deg) translateZ(130px); }
.left   { transform: rotateY(-90deg) translateZ(130px); }
.top    { transform: rotateX(90deg) translateZ(130px); }
.bottom { transform: rotateX(-90deg) translateZ(130px); }

@keyframes rotateCube {
  from { transform: rotateX(0deg) rotateY(0deg); }
  to { transform: rotateX(360deg) rotateY(360deg); }
}

/* ================= FOOTER ================= */
.love-text {
  position: absolute;
  bottom: 20px;
  font-size: 1.2rem;
  text-shadow: 0 0 10px #ff69b4;
}
/* ================= KISS SECTION ================= */
.kiss-card {
  position: absolute;
  top: 80px;        /* MOVED TO TOP */
  right: 120px;
  width: 300px;
  padding: 16px;
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  text-align: center;
  z-index: 9;
}



.kiss-title {
  font-size: 1.3rem;
  color: #d63384;
  margin-bottom: 4px;
}

.kiss-subtitle {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 10px;
}

/* ================= KISS VIDEOS ================= */
.kiss-videos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.kiss-videos video {
  width: 100%;
  height: 120px;          /* SMALL SIZE */
  object-fit: contain;   /* NO CROPPING (IMPORTANT) */
  border-radius: 12px;
  background: #000;      /* clean background */
}

/* ================= MY LOVE SECTION ================= */
.my-love-card {
  position: absolute;
  bottom: 80px;
  right: 80px;
  width: 360px;
  padding: 18px;
  background: rgba(255,255,255,0.95);
  border-radius: 22px;
  text-align: center;
  z-index: 9;

  box-shadow:
    0 0 20px rgba(255,105,180,0.5),
    0 0 40px rgba(255,182,193,0.6);
}

.my-love-title {
  font-size: 1.4rem;
  color: #d63384;
  margin-bottom: 10px;
}

/* SLIDER */
.love-slider {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.love-image {
  width: 220px;
  height: 200px;
  position: relative;
}

.love-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;   /* NO CUTTING */
  border-radius: 14px;
  background: #000;
}

/* COUNT */
.love-count {
  position: absolute;
  bottom: 6px;
  right: 8px;
  font-size: 0.75rem;
  color: white;
  background: rgba(0,0,0,0.6);
  padding: 2px 6px;
  border-radius: 8px;
}

/* BUTTONS */
.nav-btn {
  background: pink;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255,105,180,0.8);
}

.nav-btn:hover {
  transform: scale(1.1);
}

      `}</style>

      <div className="love-container">
        <h1 className="love-title">Our Love Cube 💖</h1>

        {/* TREE */}
        <div className="love-tree">
          <div className="tree-line"></div>
          <div className="tree-node">Najma 🌸<small>(rizz)</small></div>
          <div className="tree-node">Bunny 🐰<small>(like)</small></div>
          <div className="tree-node">Baby 💕<small>(love)</small></div>
          <div className="tree-node">Ajuma 💖<small>(Relatioship)</small></div>
          <div className="tree-separator">────</div>
          <div className="tree-node">Prashanth 🙂 <small>(no feelings on me for ajuma)</small></div>
          <div className="tree-node">Prassh 😄<small>(no feelings on me for ajuma)</small></div>
          <div className="tree-node">Bear 🐻<small>(like)</small></div>
          <div className="tree-node">Baby ❤️<small>(Love)</small></div>
          <div className="tree-node">Paccuuu 🫶<small>(Relationship)</small></div>
          <div className="tree-separator">────</div>
          <div className="tree-node">📍 First Met <small>18–23 Oct 2025</small></div>
          <div className="tree-node">💍 Proposal <small>25 Nov 2025</small></div>
        </div>
       {/* KISS SECTION */}
<div className="kiss-card">
  <h2 className="kiss-title">💋 Kiss Section</h2>
  <p className="kiss-subtitle">For Prashu from Ajuma Baby 💖</p>

  <div className="kiss-videos">
    <video
      src="/videos/firstkiss.mp4"
      controls
      playsInline
    />
    <video
      src="/videos/secondkiss.mp4"
      controls
      playsInline
    />
  </div>
</div>

{/* MY LOVE SECTION */}
<div className="my-love-card">
  <h2 className="my-love-title">💖 My Love Section</h2>

  <div className="love-slider">
    <button className="nav-btn" onClick={prevImage}>⬅</button>

    <div className="love-image">
      <img src={loveImages[currentIndex]} alt="love memory" />
      <p className="love-count">
        {currentIndex + 1} / {loveImages.length}
      </p>
    </div>

    <button className="nav-btn" onClick={nextImage}>➡</button>
  </div>
</div>


         {/* PROPOSAL EMOTIONAL REACTION */}
<div className="proposal-card">
  <h2 className="proposal-title">💍 Proposal – Emotional Reaction</h2>

  <div className="proposal-image">
    {/* Replace this image later */}
    <img src={cry}/>
  </div>

  <p className="proposal-text">
    That moment when feelings turned into forever 💖  
    <br />
    Happy tears, shaking hands, racing hearts ✨
  </p>
</div>


        {/* CUBE */}
        <div
          className="scene"
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onMouseMove={onDrag}
        >
          <div
            className={`cube ${isDragging ? "dragging" : "auto"}`}
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
          >
            <div className="face front"><img src={l2} /></div>
            <div className="face back"><img src={l4} /></div>
            <div className="face right"><img src={l6} /></div>
            <div className="face left"><img src={l5} /></div>
            <div className="face top"><img src={l1} /></div>
            <div className="face bottom"><img src={l3} /></div>
          </div>
        </div>

        <p className="love-text">From the first day we met to forever 💕</p>
      </div>
    </>
  );
};

export default Loveajuma;
