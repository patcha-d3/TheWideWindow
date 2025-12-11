import { useState, useEffect } from "react";
import "./08_Sailing.css";

function Sailing({ onContinue, onBack, isFadingOut, isFadingIn }) {
  const [showDescription, setShowDescription] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [boatPosition, setBoatPosition] = useState(0); // 0: start, 1: 25%, 2: center, 3: further
  const [showButtons, setShowButtons] = useState(false);
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";

  const questions = [
    {
      choices: [
        "Hold on tight, Aunt Josephine. We're almost back to shore.",
        "Hold on tight, Aunt Josephine, we almost back to the shore."
      ],
      correct: 0,
      boatPosition: 1 // 25%
    },
    {
      choices: [
        "Please staying calm, we will bring you home safe.",
        "Please stay calm. We will get you home safely."
      ],
      correct: 1,
      boatPosition: 2 // center
    },
    {
      choices: [
        "We must hurry, Captain Sham maybe looking for we.",
        "We must hurry. Captain Sham might be looking for us."
      ],
      correct: 1,
      boatPosition: 3 // further right
    }
  ];

  useEffect(() => {
    // Show description after page loads
    const timer = setTimeout(() => {
      setShowDescription(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChoiceClick = (choiceIndex) => {
    // Only allow clicking if no choice is selected or if wrong answer (to allow retry)
    if (selectedChoice !== null && selectedChoice === questions[currentQuestion].correct) {
      return; // Prevent clicking again if correct answer is already selected
    }
    
    setSelectedChoice(choiceIndex);
    const question = questions[currentQuestion];
    
    if (choiceIndex === question.correct) {
      // Move boat to next position
      setBoatPosition(question.boatPosition);
      
      // Move to next question after a delay
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedChoice(null);
        } else {
          // All questions answered correctly
          setShowButtons(true);
        }
      }, 1500);
    }
  };

  return (
    <div className={`sailing ${fadeClass}`}>
      {onBack && (
        <button className="back-button" onClick={onBack}>
          ←
        </button>
      )}
      {onContinue && showButtons && (
        <button className="next-button" onClick={onContinue}>
          →
        </button>
      )}
      <div className="sailing-background">
        <img 
          src="/images/06_bg.png" 
          alt="Background" 
          className="sailing-background-image"
        />
      </div>
      <div className={`sailing-boat-container sailing-boat-position-${boatPosition}`}>
        <img 
          src="/images/06_boat.svg" 
          alt="Boat" 
          className="sailing-boat"
        />
      </div>
      <div className="sailing-layout">
        <div className="sailing-center-column">
          {showDescription && (
            <div className="sailing-description-container">
              <div className="sailing-description">
                Aunt Josephine was tired and starving, but the leeches would attack if they smelled food on her.
                <br /><br />
                The children hurried to row back to shore, keeping her away from the snacks so the leeches wouldn't strike.
              </div>
            </div>
          )}
          {showDescription && currentQuestion < questions.length && (
            <div className="sailing-choices-container">
              <div 
                className={`sailing-choice ${selectedChoice === 0 ? (selectedChoice === questions[currentQuestion].correct ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handleChoiceClick(0)}
              >
                <span className="choice-number">1.</span>
                <span className="choice-text">"{questions[currentQuestion].choices[0]}"</span>
                {selectedChoice === 0 && selectedChoice === questions[currentQuestion].correct && (
                  <span className="choice-mark correct-mark"> ✓</span>
                )}
                {selectedChoice === 0 && selectedChoice !== questions[currentQuestion].correct && (
                  <span className="choice-mark incorrect-mark"> ✗</span>
                )}
              </div>
              <div 
                className={`sailing-choice ${selectedChoice === 1 ? (selectedChoice === questions[currentQuestion].correct ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handleChoiceClick(1)}
              >
                <span className="choice-number">2.</span>
                <span className="choice-text">"{questions[currentQuestion].choices[1]}"</span>
                {selectedChoice === 1 && selectedChoice === questions[currentQuestion].correct && (
                  <span className="choice-mark correct-mark"> ✓</span>
                )}
                {selectedChoice === 1 && selectedChoice !== questions[currentQuestion].correct && (
                  <span className="choice-mark incorrect-mark"> ✗</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sailing;
