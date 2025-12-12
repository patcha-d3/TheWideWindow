import { useState, useEffect } from "react";
import "./06_OntheWay.css";

function OntheWay({ onContinue, onBack, isFadingOut, isFadingIn }) {
  const [showButtons, setShowButtons] = useState(false);
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";

  useEffect(() => {
    // Text appears at 2s and animation takes 0.8s, so buttons show at 2.8s
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 2800); // 2s delay + 0.8s animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`onthe-way ${fadeClass}`}>
      {onBack && showButtons && (
        <button className="back-button" onClick={onBack}>
          ←
        </button>
      )}
      {onContinue && showButtons && (
        <button className="next-button" onClick={onContinue}>
          →
        </button>
      )}
      <div className="onthe-way-background">
        <img 
          src="/images/06_bg.png" 
          alt="Background" 
          className="onthe-way-background-image"
        />
      </div>
      <div className="onthe-way-boat-container">
        <img 
          src="/images/06_boat.svg" 
          alt="Boat" 
          className="onthe-way-boat"
        />
      </div>
      <div className="onthe-way-home-container">
        <img 
          src="/images/home.png" 
          alt="Home" 
          className="onthe-way-home"
        />
      </div>
      <div className="onthe-way-rain-overlay">
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
        <div className="rain-drop"></div>
      </div>
      <div className="onthe-way-lightning-overlay"></div>
      <div className="onthe-way-layout">
        <div className="onthe-way-left-column">
        </div>
        <div className="onthe-way-center-column">
          <div className="onthe-way-text-container">
            <div className="onthe-way-text">
              The children knew Aunt Josephine would never allow incorrect grammar unless she meant something important.
              <br /><br />
              That's why, when the hidden message spelled "I AM IN A CAVE," they were certain she had left a deliberate clue.
              <br /><br />
              It could only mean one thing: she was still alive, waiting to be rescued in Curdled Cave.
            </div>
          </div>
        </div>
        <div className="onthe-way-right-column">
        </div>
      </div>
    </div>
  );
}

export default OntheWay;
