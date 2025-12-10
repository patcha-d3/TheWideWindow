import { useEffect, useState, useRef } from "react";
import "./IntroStory.css";

const fullText = `If you didn't know much about the Baudelaire orphans, and you saw them sitting on their suitcases at Damocles Dock, you might think that they were bound for an exciting adventure.

After all, the three children had just disembarked from the Fickle Ferry, which had driven them across Lake Lachrymose to live with their Aunt Josephine, and in most cases such a situation would lead to thrillingly good times.

But of course you would be dead wrong. For although Violet, Klaus, and Sunny Baudelaire were about to experience events that would be both exciting and memorable, they would not be exciting and memorable like having your fortune told or going to a rodeo. Their adventure would be exciting and memorable like being chased by a werewolf through a field of thorny bushes at midnight with nobody around to help you. If you are interested in reading a story filled with thrillingly good times, I am sorry to inform you that you are most certainly reading the wrong book, because the Baudelaires experience very few good times over the course of their gloomy and miserable lives. It is a terrible thing, their misfortune, so terrible that I can scarcely bring myself to write about it.

So if you do not want to read a story of tragedy and sadness, this is your very last chance to put this game down.`;

function IntroStory({ onReady, onLeave, isFadingOut, isFadingIn }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
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
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typeNextChar = () => {
      if (currentIndex < fullText.length && isTypingRef.current) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
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
  }, []);

  return (
    <div 
      className={`intro-story ${fadeClass}`}
      onClick={skipTyping}
      style={{ cursor: isTyping ? 'pointer' : 'default' }}
    >
      <div className="intro-story-content">
        <div className="intro-story-text">
          {displayedText}
          {displayedText.length < fullText.length && (
            <span className="typing-cursor">|</span>
          )}
        </div>
        {showButtons && (
          <div className="intro-story-buttons">
            <button className="intro-button leave-button" onClick={onLeave}>
              Leave
            </button>
            <button className="intro-button ready-button" onClick={onReady}>
              Ready
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default IntroStory;
