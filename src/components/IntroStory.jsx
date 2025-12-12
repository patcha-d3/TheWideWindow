import { useEffect, useState, useRef } from "react";
import "./IntroStory.css";

const fullText = `The Baudelaire siblings — Violet, Klaus, and Sunny — became orphans after a terrible fire destroyed their home and took their parents’ lives. Now they have arrived at Damocles Dock, on their way to live with their Aunt Josephine by Lake Lachrymose.

What looks like the start of a fun adventure is, in truth, the beginning of more danger and trouble. Count Olaf, who has been chasing them for their fortune, is still somewhere out there, plotting again.

Your quest is simple but crucial:
Help the Baudelaire orphans and Aunt Josephine escape Count Olaf by communicating with correct English grammar.`;

function IntroStory({ onReady, onLeave, onBack, isFadingOut, isFadingIn }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("/images/scene_title_blank.png");
  const [isFadingToGame, setIsFadingToGame] = useState(false);
  const [showCountOlaf, setShowCountOlaf] = useState(false);
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";
  const timeoutRefs = useRef([]);
  const isTypingRef = useRef(true);

  const skipTyping = () => {
    if (isTypingRef.current) {
      // Clear all timeouts
      timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutRefs.current = [];
      
      // Show full text and buttons immediately
      setDisplayedText(fullText);
      setShowButtons(true);
      setIsTyping(false);
      isTypingRef.current = false;
      // Show Count Olaf if text contains his name
      if (fullText.includes("Count Olaf")) {
        setShowCountOlaf(true);
      }
    }
  };

  const handleReady = () => {
    setIsFadingToGame(true);
    // Hide text and buttons first
    // Then change background image after fade out
    setTimeout(() => {
      setBackgroundImage("/images/03_bg.png");
      // After background changes, call onReady
      setTimeout(() => {
        onReady();
      }, 100);
    }, 500); // Match fade out duration
  };

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typeNextChar = () => {
      if (currentIndex < fullText.length && isTypingRef.current) {
        const newText = fullText.slice(0, currentIndex + 1);
        setDisplayedText(newText);
        
        // Check if "Count Olaf" appears in the displayed text
        if (newText.includes("Count Olaf") && !showCountOlaf) {
          setShowCountOlaf(true);
        }
        
        currentIndex++;
        const timeoutId = setTimeout(typeNextChar, typingSpeed);
        timeoutRefs.current.push(timeoutId);
      } else if (currentIndex >= fullText.length && isTypingRef.current) {
        // Show buttons after typing is complete
        const timeoutId = setTimeout(() => {
          setShowButtons(true);
          setIsTyping(false);
          isTypingRef.current = false;
        }, 500);
        timeoutRefs.current.push(timeoutId);
      }
    };

    // Start typing after a short delay
    const startTyping = setTimeout(() => {
      typeNextChar();
    }, 500);
    timeoutRefs.current.push(startTyping);

    return () => {
      timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutRefs.current = [];
    };
  }, [showCountOlaf]);

  return (
    <div 
      className={`intro-story ${fadeClass}`}
      onClick={skipTyping}
      style={{ cursor: isTyping ? 'pointer' : 'default' }}
    >
      {onBack && showButtons && (
        <button className="back-button" onClick={onBack}>
          ←
        </button>
      )}
      {onReady && showButtons && (
        <button className="next-button" onClick={handleReady}>
          →
        </button>
      )}
      <div className="intro-background">
        <img 
          src={backgroundImage} 
          alt="Background" 
          className={`intro-background-image ${isFadingToGame ? 'fade-out' : ''}`}
        />
      </div>
      <div className="intro-water-container">
        <img 
          src="/images/scene_title_water.png" 
          alt="Water" 
          className="intro-water-image"
        />
      </div>
      <div className="intro-home-container">
        <img 
          src="/images/home.png" 
          alt="Home" 
          className="intro-home"
        />
      </div>
      <div className="intro-overlay"></div>
      <div className={`intro-story-layout ${isFadingToGame ? 'fade-out' : ''}`}>
        <div className="intro-story-left-column">
          <div className="intro-characters">
            <img 
              src="/images/char_violet.png" 
              alt="Violet" 
              className="intro-character intro-character-violet"
            />
            <img 
              src="/images/char_klaus.png" 
              alt="Klaus" 
              className="intro-character intro-character-klaus"
            />
            <img 
              src="/images/char_sunny.png" 
              alt="Sunny" 
              className="intro-character intro-character-sunny"
            />
          </div>
        </div>
        <div className="intro-story-center-column">
          {!isFadingToGame && (
            <div className="intro-story-text">
              {displayedText}
              {displayedText.length < fullText.length && (
                <span className="typing-cursor">|</span>
              )}
            </div>
          )}
        </div>
        <div className="intro-story-right-column">
          {showCountOlaf && (
            <div className="intro-characters-right">
              <img 
                src="/images/char_olaf.png" 
                alt="Count Olaf" 
                className="intro-character intro-character-olaf"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IntroStory;
