import React, { useState } from "react";
import img1 from "./images/1.png";
import img2 from "./images/Main.png";
import img3 from "./images/l.png";
export default function Love() {
  const [showMessage, setShowMessage] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const loveText = `
Hey bunny…

I want to tell you something from my heart.
From the day we started talking, something in me changed.
Your messages, your smile, your voice, your kindness…
they slowly became the best part of my days.

It just happened… naturally, beautifully.

And now I know it clearly:
**I love you, bunny.**
Not just a little… but truly, softly, and honestly.

I don’t expect anything from you, but u i want You.
I just wanted you to know what my heart feels. 🤍🐰

And this my proposal my lovely bunny ❤️  
[ **will u be my love?** ]
`;
const popup = () => {
  alert(
    "Hey bunny, you aren’t eligible to reject 😆\n" +
    "You can’t see my heart… how it feels, my little heart 💗🐰\n\n" +
    "I am sorry bunny, but the reject button is disabled. Please accept my love ❤️"
  );
};

  return (
    <>
      <div className="love-container">

        {!showMessage && !accepted && (
          <button className="heart-btn" onClick={() => setShowMessage(true)}>
            ❤️ Click My Heart
          </button>
        )}

        {showMessage && !accepted && (
          <div className="love-box">

            {/* Bunny + Bear Images */}
            <div className="img-row">
              <img src={img1} className="love-img" alt="bunny" />
              <img src={img2} className="love-img" alt="bear" />
            </div>

            {loveText}

            <div style={{ marginTop: "25px" }}>
              <button className="accept-btn" onClick={() => setAccepted(true)}>
                Accept
              </button>

              <button className="reject-btn" onClick={popup}>
                Reject
              </button>
            </div>
          </div>
        )}

        {accepted && (
  <>
    <div
      className="love-letter"
      style={{
        backgroundImage: `url(${img3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <p>
        Hey my bunny… 💗<br/><br/>
        From this moment, you are my love… and I am yours.  
        Not just for today, not just for a moment—  
        but for every little smile, every silly fight,  
        every soft “I miss you”, every late-night talk that feels like magic.  
        <br/><br/>
        Whatever happens—good days or bad days,  
        we stay together like this.  
        If you’re quiet, I’ll wait.  
        If you’re sad, I’ll hold you.  
        If you’re happy, I’ll celebrate with you.  
        <br/><br/>
        From now on… it's you and me, bunny.  
        My little cute heart. ❤️🐰  
        And nothing can change that.
      </p>
    </div>

    {/* ❤️ Extra line you asked for */}
    <h2 className="after-letter">
      I love u ajuma… I’m waiting for you on Insta ❤️ 
    </h2>
  </>
)}


      </div>

      {/* CSS */}
      <style>{`
         /* Main container */
.love-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  font-family: "Poppins", Arial, sans-serif;
  animation: fadeIn 1s ease-in-out;
}

/* Heart button */
.heart-btn {
  background-color: #ff4d6d;
  color: white;
  padding: 14px 26px;
  font-size: 20px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s;
  box-shadow: 0 4px 12px rgba(255, 0, 72, 0.4);
}

.heart-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 18px rgba(255, 0, 72, 0.6);
}

/* Love paragraph box */
.love-box {
  width: 80%;
  margin-top: 25px;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 220, 226, 0.95);
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  white-space: pre-line;
  line-height: 1.7;
  box-shadow: 0 0 22px rgba(255, 140, 160, 0.6);
  animation: popUp 0.5s ease-in-out;
}

/* ==== Image Section ==== */
.img-row {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 25px;

  padding: 15px;
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 230, 235, 0.7),
    rgba(255, 200, 215, 0.7)
  );
  backdrop-filter: blur(6px);
  box-shadow: 0 5px 25px rgba(255, 150, 170, 0.3);
}

.love-img {
  width: 95px;
  height: 95px;
  object-fit: cover;
  border-radius: 20px;

  /* Soft glow */
  box-shadow: 0 6px 20px rgba(255, 120, 160, 0.30);

  /* Animation */
  animation: softPop 0.6s ease;

  /* Soft border */
  border: 3px solid rgba(255, 200, 210, 0.35);
}


/* Accept button */
.accept-btn {
  background-color: #22c55e;
  color: white;
  padding: 12px 22px;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(0, 150, 60, 0.3);
}

.accept-btn:hover {
  transform: scale(1.07);
  box-shadow: 0 6px 14px rgba(0, 150, 60, 0.4);
}

.reject-btn {
  background-color: #f87171;
  color: white;
  padding: 12px 22px;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(255, 120, 120, 0.3);
}

.reject-btn:hover {
  transform: scale(1.05);
  background-color: #ef4444;
  box-shadow: 0 6px 14px rgba(255, 100, 100, 0.4);
}


/* Final text after accept */
.final-text {
  margin-top: 30px;
  color: #8b2be2;
  font-size: 26px;
  font-weight: bold;
  animation: fadeIn 1s ease-in-out;
}

/* ==== Animations ==== */

@keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

@keyframes popUp {
  0% {transform: scale(0.7); opacity: 0;}
  100% {transform: scale(1); opacity: 1;}
}

@keyframes softPop {
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.love-letter {
  width: 80%;
  max-width: 650px;
  margin-top: 30px;
  padding: 45px 35px;

  /* Background image */
  background-image: url(${img3});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 16px;
  overflow: hidden;

  .after-letter {
  margin-top: 20px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: #d6336c;
  font-family: "Poppins", sans-serif;
  animation: fadeIn 1.2s ease-in-out;
}

  /* Text styling */
  font-family: "Times New Roman", serif;
  font-size: 22px;
  line-height: 1.8;
  color: #1a1a1a;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.6);

  animation: oldLetter 0.6s ease-in-out;
}

.love-letter {
  width: 80%;
  max-width: 650px;
  margin-top: 30px;
  padding: 45px 35px;

  /* Background image */
  background-image: url(${img3});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 16px;
  overflow: hidden;

  /* Text styling */
  font-family: "Times New Roman", serif;
  font-size: 22px;
  line-height: 1.8;
  color: #2e1a0f;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.4);

  animation: oldLetter 0.6s ease-in-out;
}

/* Soft overlay for readability */
.love-letter::before {
  content: "";
  position: absolute;
  inset: 0;

  /* ✨ PERFECT OPACITY (not too bright, not too faded) */
  background: rgba(255,255,255,0.32);  
  backdrop-filter: blur(1px);

  z-index: 0;
}

/* Bring text above overlay */
.love-letter p {
  position: relative;
  z-index: 2;
}

@keyframes oldLetter {
  0% { opacity: 0; transform: scale(0.9) rotate(-1deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}



      `}</style>
    </>
  );
}
