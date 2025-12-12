import { useState, useEffect } from "react";
import "./03_MeetJosephine.css";

function MeetJosephine({ onContinue, onBack, isFadingOut, isFadingIn }) {
  const [showButtons, setShowButtons] = useState(false);
  const [showAuntJosephine, setShowAuntJosephine] = useState(false);
  const fadeClass = isFadingOut ? "fade-out" : "";

  useEffect(() => {
    // Text appears at 2s and animation takes 0.8s, so buttons show at 2.8s
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 2800); // 2s delay + 0.8s animation

    // Show Aunt Josephine when text appears (at 2s, same time as text fade in)
    const auntTimer = setTimeout(() => {
      setShowAuntJosephine(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(auntTimer);
    };
  }, []);

  return (
    <div className={`meet-josephine ${fadeClass}`}>
      <link rel="preload" as="image" href="/images/03_bg.png" />
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
      <div className="meet-josephine-background">
        <img 
          src="/images/03_bg.png" 
          alt="Background" 
          className="meet-josephine-background-image"
          loading="eager"
          decoding="sync"
        />
      </div>
      <div className="meet-josephine-layout">
        <div className="meet-josephine-left-column">
          <div className="meet-josephine-characters">
            <img 
              src="/images/char_violet.png" 
              alt="Violet" 
              className="meet-josephine-character meet-josephine-character-violet"
            />
            <img 
              src="/images/char_klaus.png" 
              alt="Klaus" 
              className="meet-josephine-character meet-josephine-character-klaus"
            />
            <img 
              src="/images/char_sunny.png" 
              alt="Sunny" 
              className="meet-josephine-character meet-josephine-character-sunny"
            />
          </div>
        </div>
        <div className="meet-josephine-center-column">
          <div className="meet-josephine-text-container">
            <div className="meet-josephine-text">
              The Baudelaires met Aunt Josephine when they moved into her cliff-side house, where the only thing she trusted and never feared was proper grammar.
              <br /><br />
              She had lost her husband, Ike, when the deadly Lachrymose Leeches attacked him in the lake after smelling food on him.
              <br /><br />
              Since that day, she became terrified of almost everything, especially anything connected to Lake Lachrymose.
            </div>
          </div>
        </div>
        <div className="meet-josephine-right-column">
          {showAuntJosephine && (
            <div className="meet-josephine-characters-right">
              <img 
                src="/images/char_aunt.png" 
                alt="Aunt Josephine" 
                className="meet-josephine-character meet-josephine-character-aunt"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MeetJosephine;
