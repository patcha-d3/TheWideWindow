import { useState, useEffect } from "react";
import "./12_Ending.css";

function Ending({ onBackToTitle, onBack, isFadingOut, isFadingIn }) {
  const [showText, setShowText] = useState(false);
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";

  useEffect(() => {
    // Show text after page loads
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`ending ${fadeClass}`}>
      {onBack && (
        <button className="back-button" onClick={onBack}>
          ←
        </button>
      )}
      <div className="ending-background">
        <img 
          src="/images/scene_title_blank.png" 
          alt="Background" 
          className="ending-background-image"
        />
      </div>
      <div className="ending-water-container">
        <img 
          src="/images/scene_title_water.png" 
          alt="Water" 
          className="ending-water-image"
        />
      </div>
      <div className="ending-home-container">
        <img 
          src="/images/home.png" 
          alt="Home" 
          className="ending-home"
        />
      </div>
      <div className="ending-overlay"></div>
      <div className="ending-layout">
        <div className="ending-center-column">
          {showText && (
            <div className="ending-text-container">
              <div className="ending-text">
                The End.
              </div>
            </div>
          )}
          {showText && onBackToTitle && (
            <div className="ending-button-container">
              <button className="ending-back-to-title-button" onClick={onBackToTitle}>
                Back to title
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ending;
