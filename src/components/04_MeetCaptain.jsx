import { useState, useEffect } from "react";
import "./04_MeetCaptain.css";

function MeetCaptain({ onContinue, onBack, isFadingOut, isFadingIn }) {
  const [showButtons, setShowButtons] = useState(false);
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";

  useEffect(() => {
    // Text appears at 2s and animation takes 0.8s, so buttons show after text is fully visible
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 3000); // 2s delay + 0.8s animation + 0.2s buffer to ensure text is fully visible

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`meet-captain ${fadeClass}`}>
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
      <div className="meet-captain-background">
        <img 
          src="/images/04_bg.png" 
          alt="Background" 
          className="meet-captain-background-image"
        />
      </div>
      <div className="meet-captain-layout">
        <div className="meet-captain-left-column">
          <div className="meet-captain-characters-left">
            <img 
              src="/images/char_sham.png" 
              alt="Captain Sham" 
              className="meet-captain-character meet-captain-character-sham"
            />
          </div>
        </div>
        <div className="meet-captain-center-column">
          <div className="meet-captain-text-container">
            <div className="meet-captain-text">
              One day,
              the children and Aunt Josephine met Captain Sham for the first time, and they immediately recognized him as Count Olaf in disguise.
              <br /><br />
              Aunt Josephine, however, didn't believe them and even seemed to get along with him, which made the children feel frightened all over again.
              <br /><br />
              Their worry grew when Aunt Josephine asked them to head home alone while she and the captain continued their date at a nearby restaurant.
            </div>
          </div>
        </div>
        <div className="meet-captain-right-column">
          <div className="meet-captain-characters">
            <img 
              src="/images/char_violet.png" 
              alt="Violet" 
              className="meet-captain-character meet-captain-character-violet"
            />
            <img 
              src="/images/char_klaus.png" 
              alt="Klaus" 
              className="meet-captain-character meet-captain-character-klaus"
            />
            <img 
              src="/images/char_sunny.png" 
              alt="Sunny" 
              className="meet-captain-character meet-captain-character-sunny"
            />
            <img 
              src="/images/char_aunt.png" 
              alt="Aunt Josephine" 
              className="meet-captain-character meet-captain-character-aunt"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetCaptain;
