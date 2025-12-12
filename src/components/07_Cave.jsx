import { useState, useEffect } from "react";
import "./07_Cave.css";

function Cave({ onContinue, onBack, isFadingOut, isFadingIn }) {
  const [showButtons, setShowButtons] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showAuntShake, setShowAuntShake] = useState(false);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";

  const correctChoice = 1; // Choice 1 is correct

  useEffect(() => {
    // Characters slide in, so description shows after animation completes
    const timer1 = setTimeout(() => {
      setShowDescription(true);
    }, 3000); // 0.9s (last animation) + 0.8s (animation duration) + buffer

    // Show choices after description appears
    const timer2 = setTimeout(() => {
      setShowChoices(true);
    }, 4000); // 1s after description

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleChoiceClick = (choiceNumber) => {
    setSelectedChoice(choiceNumber);
    if (choiceNumber === correctChoice) {
      setTimeout(() => {
        setShowResult(true);
        setShowButtons(true);
      }, 500);
    } else {
      // Show shaking animation and chat bubble for incorrect answer
      setShowAuntShake(true);
      setShowChatBubble(true);
      
      // Reset shaking after animation completes
      setTimeout(() => {
        setShowAuntShake(false);
      }, 600);
      
      // Hide chat bubble after 3 seconds
      setTimeout(() => {
        setShowChatBubble(false);
      }, 3000);
    }
  };

  return (
    <div className={`cave ${fadeClass}`}>
      {onBack && showButtons && (
        <button className="back-button" onClick={onBack}>
          ←
        </button>
      )}
      {onContinue && showButtons && showResult && (
        <button className="next-button" onClick={onContinue}>
          →
        </button>
      )}
      <div className="cave-background">
        <img 
          src="/images/07_bg.png" 
          alt="Background" 
          className="cave-background-image"
        />
      </div>
      <div className="cave-layout">
        <div className="cave-left-column">
          <div className="cave-characters-left">
            <img 
              src="/images/char_aunt.png" 
              alt="Aunt Josephine" 
              className={`cave-character cave-character-aunt ${showAuntShake ? 'shake' : ''}`}
            />
            {showChatBubble && (
              <div className="cave-chat-bubble">
                <div className="cave-chat-bubble-text">
                  Sorry, I'm not sure I understand
                </div>
                <div className="cave-chat-bubble-tail"></div>
              </div>
            )}
          </div>
        </div>
        <div className="cave-center-column">
          {showDescription && (
            <div className="cave-description-container">
              <div className="cave-description">
                The children found Aunt Josephine inside Curdled Cave and convinced her to leave the cave with them.
              </div>
            </div>
          )}
          {showChoices && (
            <div className="cave-choices-container">
              <div 
                className={`cave-choice ${selectedChoice === 1 ? 'correct' : ''}`}
                onClick={() => handleChoiceClick(1)}
              >
                <span className="choice-number">1.</span>
                <span className="choice-text">Let's get out of here and find a new home to live in together.</span>
                {selectedChoice === 1 && (
                  <span className="choice-mark correct-mark"> ✓</span>
                )}
              </div>
              <div 
                className={`cave-choice ${selectedChoice === 2 ? 'incorrect' : ''}`}
                onClick={() => handleChoiceClick(2)}
              >
                <span className="choice-number">2.</span>
                <span className="choice-text">Let's get out from here and find a new home for live together in.</span>
                {selectedChoice === 2 && (
                  <span className="choice-mark incorrect-mark"> ✗</span>
                )}
              </div>
            </div>
          )}
          {showResult && (
            <div className="cave-result-container">
              <div className="cave-result">
                You saved Aunt Josephine.
              </div>
            </div>
          )}
        </div>
        <div className="cave-right-column">
          <div className="cave-characters">
            <img 
              src="/images/char_violet.png" 
              alt="Violet" 
              className="cave-character cave-character-violet"
            />
            <img 
              src="/images/char_klaus.png" 
              alt="Klaus" 
              className="cave-character cave-character-klaus"
            />
            <img 
              src="/images/char_sunny.png" 
              alt="Sunny" 
              className="cave-character cave-character-sunny"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cave;
