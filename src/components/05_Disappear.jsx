import { useState, useEffect, useRef } from "react";
import "./05_Disappear.css";

function Disappear({ onBack, onContinue, isFadingOut, isFadingIn }) {
  const [showNextButton, setShowNextButton] = useState(false);
  const [text, setText] = useState("On that night...");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showCharacters, setShowCharacters] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [selectedSentences, setSelectedSentences] = useState(new Set());
  const [incorrectSentences, setIncorrectSentences] = useState(new Set());
  const [showCorrect, setShowCorrect] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const audioRef = useRef(null);
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";

  const correctSentences = [
    "I life will be at its end.",
    "and the world feels unbearable am I to me.",
    "In my final wish,",
    "a kind and honorable a man.",
    "even in the darkest cave moments."
  ];

  const correctWordsMap = {
    "I life will be at its end.": "I",
    "and the world feels unbearable am I to me.": "am",
    "In my final wish,": "in",
    "a kind and honorable a man.": "a",
    "even in the darkest cave moments.": "cave"
  };
  
  const letterSentences = [
    "To Violet, Klaus and Sunny,",
    "By the time you read this,",
    "I life will be at its end.",
    "My heart is heavy,",
    "and the world feels unbearable am I to me.",
    "In my final wish,",
    "I leave you in the care of Captain Sham,",
    "a kind and honorable a man.",
    "Please remember that I always cared for you,",
    "even in the darkest cave moments.",
    "— Aunt Josephine"
  ];

  const handleSentenceClick = (sentence) => {
    const isCorrect = correctSentences.includes(sentence);
    
    if (isCorrect) {
      // Handle correct sentences
      const newSelected = new Set(selectedSentences);
      if (newSelected.has(sentence)) {
        newSelected.delete(sentence);
      } else {
        newSelected.add(sentence);
      }
      setSelectedSentences(newSelected);
      
      // Update foundWords based on selected sentences in order
      setFoundWords(() => {
        const words = [];
        correctSentences.forEach(cs => {
          if (newSelected.has(cs)) {
            words.push(correctWordsMap[cs]);
          }
        });
        return words;
      });
      
      // Check if all correct sentences are selected
      const allCorrect = correctSentences.every(cs => newSelected.has(cs)) && newSelected.size === correctSentences.length;
      setShowCorrect(allCorrect);
    } else {
      // Handle incorrect sentences
      const newIncorrect = new Set(incorrectSentences);
      if (newIncorrect.has(sentence)) {
        newIncorrect.delete(sentence);
      } else {
        newIncorrect.add(sentence);
      }
      setIncorrectSentences(newIncorrect);
    }
  };

  useEffect(() => {
    // Show next button after text appears (1s delay + 0.8s animation = 1.8s)
    const timer = setTimeout(() => {
      setShowNextButton(true);
    }, 2000); // 1s delay + 0.8s animation + 0.2s buffer

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => {
        setText("The Baudelaire children heard something wrong from the library.");
      };

      const handleEnded = () => {
        setBackgroundImage("/images/05_bg.png");
        setTimeout(() => {
          setShowCharacters(true);
          setText("The children discovered the wide library window shattered and freezing wind rushing through the room. It was clear this was no ordinary accident—Aunt Josephine had gone out the window into the dark lake below.\n\nEven more frightening, she had left behind a mysterious note that changed everything.");
        }, 100);
      };

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const handleContinue = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(error => {
        console.log("Audio play failed:", error);
      });
    }
    // Don't call onContinue immediately, wait for audio to end
  };

  return (
    <div className={`disappear ${fadeClass}`} style={{ backgroundColor: backgroundImage ? 'transparent' : '#000000' }}>
      {backgroundImage && (
        <div className="disappear-background">
          <img 
            src={backgroundImage} 
            alt="Background" 
            className="disappear-background-image"
          />
        </div>
      )}
      {onBack && (
        <button className="back-button" onClick={onBack}>
          ←
        </button>
      )}
      {showNextButton && !showCharacters && (
        <button className="next-button" onClick={handleContinue}>
          →
        </button>
      )}
      {showCharacters && onContinue && showCorrect && (
        <button 
          className="next-button" 
          onClick={onContinue}
        >
          →
        </button>
      )}
      {backgroundImage && (
        <div className="disappear-layout">
          <div className="disappear-left-column">
            <div className="disappear-characters">
              <img 
                src="/images/char_violet.png" 
                alt="Violet" 
                className="disappear-character disappear-character-violet"
              />
              <img 
                src="/images/char_klaus.png" 
                alt="Klaus" 
                className="disappear-character disappear-character-klaus"
              />
              <img 
                src="/images/char_sunny.png" 
                alt="Sunny" 
                className="disappear-character disappear-character-sunny"
              />
            </div>
          </div>
          <div className="disappear-center-column">
            {backgroundImage && (
              <div 
                className="disappear-letter-container"
                onClick={() => setShowLetterModal(true)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src="/images/05_letter.png" 
                  alt="Letter" 
                  className="disappear-letter"
                />
              </div>
            )}
            {backgroundImage && (
              <div className="disappear-story-text-container">
                <div className="disappear-story-text">
                  The children discovered the wide library window shattered and freezing wind rushing through the room. It was clear this was no ordinary accident—Aunt Josephine had gone out the window into the dark lake below.
                  <br /><br />
                  Even more frightening, she had left behind a mysterious note that changed everything.
                </div>
              </div>
            )}
          </div>
          <div className="disappear-right-column">
          </div>
        </div>
      )}
      {!backgroundImage && (
        <div className="disappear-text-container">
          <div className="disappear-text">
            {text}
          </div>
        </div>
      )}
      {showLetterModal && (
        <div className="letter-modal-overlay" onClick={() => setShowLetterModal(false)}>
          <div className="letter-modal" onClick={(e) => e.stopPropagation()}>
            <button className="letter-close-button" onClick={() => setShowLetterModal(false)}>
              ×
            </button>
            <div className="letter-modal-content">
              <div className="letter-instruction">
                Find all 5 grammatical errors
              </div>
              <div className="letter-sentences">
                {letterSentences.map((sentence, index) => {
                  const isCorrect = correctSentences.includes(sentence);
                  const isSelected = selectedSentences.has(sentence);
                  const isIncorrect = incorrectSentences.has(sentence);
                  
                  // Determine line breaks
                  let lineBreaks = null;
                  if (index === 0) {
                    // After "To Violet, Klaus and Sunny,"
                    lineBreaks = <><br /><br /></>;
                  } else if (index === 4) {
                    // After "and the world feels unbearable am I to me."
                    lineBreaks = <br />;
                  } else if (index === 7) {
                    // After "a kind and honorable a man."
                    lineBreaks = <br />;
                  } else if (index === 9) {
                    // After "even in the darkest cave moments."
                    lineBreaks = <br />;
                  } else if (index < letterSentences.length - 1) {
                    // Regular space for other sentences
                    lineBreaks = ' ';
                  }
                  
                  return (
                    <span key={index}>
                      <span
                        className={`letter-sentence clickable-sentence ${isCorrect ? 'correct-sentence' : ''} ${isSelected ? 'selected' : ''} ${isIncorrect ? 'incorrect' : ''}`}
                        onClick={() => handleSentenceClick(sentence)}
                        style={{ cursor: 'pointer' }}
                      >
                        {sentence}
                        {isSelected && isCorrect && <span className="checkmark"> ✓</span>}
                        {isIncorrect && <span className="crossmark"> ✗</span>}
                      </span>
                      {lineBreaks}
                    </span>
                  );
                })}
              </div>
              {foundWords.length > 0 && (
                <div className="letter-found-words">
                  {foundWords.map((word, index) => (
                    <span key={index} className="found-word">
                      {word}
                      {index < foundWords.length - 1 && ' '}
                    </span>
                  ))}
                </div>
              )}
              {showCorrect && (
                <div className="letter-feedback letter-feedback-correct">
                  Correct!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <audio
        ref={audioRef}
        src="/audio/05_break sound.mp3"
        preload="auto"
      />
    </div>
  );
}

export default Disappear;
