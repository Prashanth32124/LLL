import React, { useState, useEffect } from "react";
import img1 from "./images/1.png";
import img2 from "./images/Main.png";
import img3 from "./images/l.png";
import { useNavigate } from "react-router-dom";

export default function Love() {
  const [showMessage, setShowMessage] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  /* 🔑 PRESS 'P' TWICE → GO TO CHAT */
  useEffect(() => {
    let pCount = 0;
    let pTimer;

    const handlePKey = (e) => {
      if (e.key.toLowerCase() === "p") {
        pCount++;
        clearTimeout(pTimer);

        pTimer = setTimeout(() => {
          pCount = 0;
        }, 500);

        if (pCount === 2) {
          navigate("/chat");
          pCount = 0;
        }
      }
    };

    window.addEventListener("keydown", handlePKey);
    return () => {
      window.removeEventListener("keydown", handlePKey);
      clearTimeout(pTimer);
    };
  }, [navigate]);

  const loveText = `
Hey bunny…

I want to tell you something from my heart.
From the day we started talking, something in me changed.
Your messages, your smile, your voice, your kindness…
they slowly became the best part of my days.

It just happened… naturally, beautifully.

And now I know it clearly:
I love you, bunny.
Not just a little… but truly, softly, and honestly.

I don’t expect anything from you, but I want YOU.
I just wanted you to know what my heart feels. 🤍🐰

And this is my proposal my lovely bunny ❤️  
[ will u be my love? ]
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

        {/* ❤️ STEP 1 */}
        {!showMessage && !accepted && (
          <button
            className="heart-btn"
            onClick={() => setShowMessage(true)}
          >
            ❤️ Click My Heart
          </button>
        )}

        {/* 💌 STEP 2 */}
        {showMessage && !accepted && (
          <div className="love-box">
            <div className="img-row">
              <img src={img1} className="love-img" alt="bunny" />
              <img src={img2} className="love-img" alt="bear" />
            </div>

            {loveText}

            <div style={{ marginTop: "25px" }}>
              <button
                className="accept-btn"
                onClick={() => setAccepted(true)}
              >
                Accept
              </button>

              <button className="reject-btn" onClick={popup}>
                Reject
              </button>
            </div>
          </div>
        )}

        {/* 💖 STEP 3 */}
        {accepted && (
          <>
            <div
              className="love-letter"
              style={{
                backgroundImage: `url(${img3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                paddingBottom: "60px"
              }}
            >
              <p>
                Hey my bunny… 💗<br /><br />
                From this moment, you are my love… and I am yours.  
                Not just for today, not just for a moment—  
                but for every little smile, every silly fight,  
                every soft “I miss you”, every late-night talk that feels like magic.  
                <br /><br />
                Whatever happens—good days or bad days,  
                we stay together like this.  
                If you’re quiet, I’ll wait.  
                If you’re sad, I’ll hold you.  
                If you’re happy, I’ll celebrate with you.  
                <br /><br />
                From now on… it’s you and me, bunny.  
                My little cute heart. ❤️🐰  
                And nothing can change that.
              </p>

              {/* 🔽 NEW CHAT NAVIGATION BUTTON */}
              <div className="chat-nav-wrapper">
                <button 
                  className="chat-glass-btn" 
                  onClick={() => navigate("/chat")}
                >
                  💬 Go to Our Private Chat
                </button>
              </div>
            </div>

            <h2 className="after-letter">
              I love u ajuma… I’m waiting for you on Insta ❤️
            </h2>

            <button onClick={() => navigate("/loveloading")} className="standard-btn">
              see our relationship ajuma baby
            </button>

            <button
              className="newyear-btn"
              onClick={() => navigate("/message")}
            >
              🎉 Welcome to 2026 my love, Ajuma cutie pie ❤️  
              <br />
              I want to express one more feeling… please open this 🥹
            </button>
          </>
        )}
      </div>

      <style>{`
        .love-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 40px;
          font-family: "Poppins", Arial, sans-serif;
          padding-bottom: 50px;
        }

        .heart-btn {
          background-color: #ff4d6d;
          color: white;
          padding: 14px 26px;
          font-size: 20px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(255, 0, 72, 0.4);
          transition: transform 0.2s;
        }
        .heart-btn:hover { transform: scale(1.1); }

        .love-box {
          width: 80%;
          margin-top: 25px;
          padding: 30px;
          border-radius: 20px;
          background: rgba(255, 220, 226, 0.95);
          text-align: center;
          font-size: 20px;
          white-space: pre-line;
          line-height: 1.7;
          border: 1px solid #ffb3c1;
        }

        .img-row {
          display: flex;
          justify-content: center;
          gap: 25px;
          margin-bottom: 25px;
        }

        .love-img {
          width: 95px;
          height: 95px;
          border-radius: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .accept-btn, .reject-btn {
          padding: 12px 22px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          margin: 0 10px;
          transition: 0.3s;
        }

        .accept-btn { background: #22c55e; color: white; }
        .accept-btn:hover { background: #16a34a; transform: translateY(-2px); }

        .reject-btn { background: #f87171; color: white; }

        .love-letter {
          width: 80%;
          max-width: 650px;
          margin-top: 30px;
          padding: 45px 35px;
          border-radius: 16px;
          font-size: 22px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          position: relative;
        }

        /* 🎨 PRIVATE CHAT BUTTON CSS */
        .chat-nav-wrapper {
          margin-top: 30px;
          display: flex;
          justify-content: center;
        }

        .chat-glass-btn {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.4);
          color: #d6336c;
          padding: 12px 25px;
          font-size: 18px;
          font-weight: bold;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 8px 32px rgba(214, 51, 108, 0.2);
        }

        .chat-glass-btn:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(214, 51, 108, 0.4);
          color: #ff4d6d;
        }

        .standard-btn {
          margin-top: 20px;
          padding: 10px 20px;
          border-radius: 10px;
          border: 1px solid #ff7aa2;
          background: white;
          color: #ff4d6d;
          cursor: pointer;
        }

        .after-letter {
          margin-top: 20px;
          font-size: 28px;
          font-weight: 700;
          color: #d6336c;
          text-align: center;
        }

        .newyear-btn {
          margin-top: 25px;
          padding: 16px 26px;
          font-size: 20px;
          border-radius: 18px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #ff7aa2, #ff4d6d);
          color: white;
          box-shadow: 0 6px 15px rgba(255, 77, 109, 0.4);
        }
      `}</style>
    </>
  );
}