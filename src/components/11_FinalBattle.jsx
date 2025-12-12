import { useEffect, useRef, useState } from "react";
import "./11_FinalBattle.css";

function FinalBattle({ onContinue, onBack, isFadingOut, isFadingIn }) {
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";
  const audioRef = useRef(null);
  const audioStartedRef = useRef(false);
  const [showCharSham, setShowCharSham] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [shuffledCorrectIndex, setShuffledCorrectIndex] = useState(0);
  const [leechesOpacity, setLeechesOpacity] = useState(0);
  const [leechesMoveUp, setLeechesMoveUp] = useState(false);
  const [leechesMoveDown, setLeechesMoveDown] = useState(false);
  const [showCharOlaf, setShowCharOlaf] = useState(false);
  const [charOlafMoveDown, setCharOlafMoveDown] = useState(false);
  const [hideChoices, setHideChoices] = useState(false);
  const [showBoatShake, setShowBoatShake] = useState(false);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const auntMessages = [
    "Aunt Josephine: Sorry, what did you mean?",
    "Aunt Josephine: Sorry, I didn't quite catch that",
    "Aunt Josephine: Pardon me, could you explain that again?"
  ];

  const questions = [
    {
      question: "1. Captain Sham is holding food in his hands. If so…",
      choices: [
        "…the leeches will smell the food on him.",
        "…we should asking him for food because Aunt Josephine hungry very much.",
        "…we should going back to Curdled Cave now."
      ],
      correct: 0
    },
    {
      question: "2. The leeches have caught the scent! We should…",
      choices: [
        "…warn him to stay away from the shore.",
        "…ask him sharing the food with we.",
        "…Wait doing nothing stay here"
      ],
      correct: 0
    },
    {
      question: "3. \"Captain Sham! Trust us. Drop the food — you are…\"",
      choices: [
        "…going to be bitten by the leeches.",
        "…very delicious much now, isn't it you?",
        "…want swim in the water, yes or no you?"
      ],
      correct: 0
    }
  ];
  
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Set volume to 50%
      audio.loop = true; // Loop the audio
      audio.muted = false; // Ensure not muted
      
      // Function to play audio
      const playAudio = async () => {
        if (audio && !audioStartedRef.current && audio.paused) {
          try {
            await audio.play();
            audioStartedRef.current = true;
            console.log("Audio playing successfully");
          } catch (error) {
            console.log("Audio play error:", error);
          }
        }
      };
      
      // Try to play when audio is ready
      const tryPlayWhenReady = () => {
        if (audio.readyState >= 2) {
          playAudio();
        } else {
          // Wait for audio to be ready
          const handleCanPlay = () => {
            playAudio();
          };
          audio.addEventListener('canplay', handleCanPlay, { once: true });
          audio.addEventListener('loadeddata', handleCanPlay, { once: true });
          audio.addEventListener('canplaythrough', handleCanPlay, { once: true });
        }
      };
      
      // Try immediately
      tryPlayWhenReady();
      playAudio();
      
      // Also try after delays to ensure audio element is ready
      setTimeout(() => {
        tryPlayWhenReady();
        playAudio();
      }, 100);
      
      setTimeout(() => {
        tryPlayWhenReady();
        playAudio();
      }, 500);
      
      // Add event listeners for user interaction to enable audio
      const enableAudio = () => {
        if (!audioStartedRef.current) {
          playAudio();
        }
      };
      
      // Listen for any user interaction
      document.addEventListener('click', enableAudio, { once: true, passive: true });
      document.addEventListener('touchstart', enableAudio, { once: true, passive: true });
      document.addEventListener('keydown', enableAudio, { once: true, passive: true });
      document.addEventListener('mousemove', enableAudio, { once: true, passive: true });
      
      // Cleanup
      return () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
        document.removeEventListener('keydown', enableAudio);
        document.removeEventListener('mousemove', enableAudio);
      };
    }
  }, []);

  // Shuffle choices function
  const shuffleChoices = (question) => {
    const choices = [...question.choices];
    const correctAnswer = choices[question.correct];
    
    // Shuffle array
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    // Find new index of correct answer
    const newCorrectIndex = choices.indexOf(correctAnswer);
    
    return { shuffledChoices: choices, correctIndex: newCorrectIndex };
  };

  useEffect(() => {
    // Show char_sham after a short delay
    const charTimer = setTimeout(() => {
      setShowCharSham(true);
    }, 500);

    // Show description after char_sham appears (wait for fade in animation ~1s)
    const descTimer = setTimeout(() => {
      setShowDescription(true);
    }, 1500); // 0.5s + 1s for char fade in

    return () => {
      clearTimeout(charTimer);
      clearTimeout(descTimer);
    };
  }, []);

  useEffect(() => {
    // Shuffle choices when question changes
    if (currentQuestion < questions.length) {
      const question = questions[currentQuestion];
      const { shuffledChoices, correctIndex } = shuffleChoices(question);
      setShuffledChoices(shuffledChoices);
      setShuffledCorrectIndex(correctIndex);
      setSelectedChoice(null);
    }
  }, [currentQuestion]);

  const handleChoiceClick = (choiceIndex) => {
    // Only allow clicking if no choice is selected or if wrong answer (to allow retry)
    if (selectedChoice !== null && selectedChoice === shuffledCorrectIndex) {
      return; // Prevent clicking again if correct answer is already selected
    }
    
    setSelectedChoice(choiceIndex);
    const question = questions[currentQuestion];
    
    if (choiceIndex === shuffledCorrectIndex) {
      // Increase leeches opacity by 0.3
      setLeechesOpacity(prev => Math.min(prev + 0.3, 1));
      
      // Move to next question after a delay
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedChoice(null);
        } else {
          // All questions answered correctly - last question
          // Hide choices
          setHideChoices(true);
          // Move leeches up and change char_sham to char_olaf
          setLeechesMoveUp(true);
          setTimeout(() => {
            setShowCharOlaf(true);
            // After 2 seconds, move down both leeches and char_olaf
            setTimeout(() => {
              setLeechesMoveDown(true);
              setCharOlafMoveDown(true);
              // After move-down animation completes (2 seconds), redirect to ending
              setTimeout(() => {
                handleContinue();
              }, 2000);
            }, 2000);
          }, 500); // Wait for leeches animation to start
        }
      }, 1500);
    } else {
      // Show shaking animation and chat bubble for incorrect answer
      const randomMessage = auntMessages[Math.floor(Math.random() * auntMessages.length)];
      setChatMessage(randomMessage);
      setShowBoatShake(true);
      setShowChatBubble(true);
      
      // Reset shaking after animation completes
      setTimeout(() => {
        setShowBoatShake(false);
      }, 600);
      
      // Hide chat bubble after 3 seconds
      setTimeout(() => {
        setShowChatBubble(false);
      }, 3000);
    }
  };

  // Handle click to continue and ensure audio plays
  const handleContinue = () => {
    const audio = audioRef.current;
    if (audio && !audioStartedRef.current) {
      audio.play().then(() => {
        audioStartedRef.current = true;
      }).catch(error => {
        console.log("Audio play failed on click:", error);
      });
    }
    onContinue();
  };
  
  return (
    <div className={`final-battle ${fadeClass}`}>
      <div className="final-battle-background">
        <img 
          src="/images/09_bg.png" 
          alt="Final Battle Background" 
          className="background-image"
        />
      </div>
      <div className="final-battle-water-container">
        <img 
          src="/images/09_water.png" 
          alt="Water" 
          className="water-image"
        />
      </div>
      <div className="final-battle-grain-overlay">
        <img 
          src="/images/grain.png" 
          alt="Grain Texture" 
          className="grain-image"
        />
      </div>
      <div className="final-battle-rain-overlay">
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
      <div className="final-battle-lightning-overlay"></div>
      <div className="final-battle-layout">
        <div className="final-battle-left-column">
          <div className="final-battle-boat-container">
            <img 
              src="/images/06_boat.svg" 
              alt="Boat" 
              className={`final-battle-boat ${showBoatShake ? 'shake' : ''}`}
            />
            {showChatBubble && (
              <div className="final-battle-chat-bubble">
                <div className="final-battle-chat-bubble-text">
                  {chatMessage}
                </div>
                <div className="final-battle-chat-bubble-tail"></div>
              </div>
            )}
          </div>
        </div>
        <div className="final-battle-center-column">
          {(showCharSham || showCharOlaf) && (
            <div className="final-battle-character-container">
              {!showCharOlaf && (
                <img 
                  src="/images/char_sham.png" 
                  alt="Captain Sham" 
                  className="final-battle-character"
                />
              )}
              {showCharOlaf && (
                <img 
                  src="/images/char_olaf.png" 
                  alt="Count Olaf" 
                  className={`final-battle-character-olaf ${charOlafMoveDown ? 'move-down' : ''}`}
                />
              )}
              <img 
                src="/images/leeches.svg" 
                alt="Leeches" 
                className={`final-battle-leeches ${leechesMoveUp ? 'move-up' : ''} ${leechesMoveDown ? 'move-down' : ''}`}
                style={{ opacity: leechesOpacity }}
              />
            </div>
          )}
        </div>
        <div className="final-battle-right-column">
        </div>
      </div>
      {showDescription && currentQuestion < questions.length && !hideChoices && (
        <div className="final-battle-choices-wrapper">
          <div className="final-battle-question">
            {questions[currentQuestion].question}
          </div>
          <div className="final-battle-choices-container">
            <div className="final-battle-choices">
              {shuffledChoices.map((choice, index) => (
                <div
                  key={index}
                  className={`final-battle-choice ${selectedChoice === index ? (selectedChoice === shuffledCorrectIndex ? 'correct' : 'incorrect') : ''}`}
                  onClick={() => handleChoiceClick(index)}
                >
                  <span className="choice-text">{choice}</span>
                  {selectedChoice === index && selectedChoice === shuffledCorrectIndex && (
                    <span className="choice-mark correct-mark"> ✓</span>
                  )}
                  {selectedChoice === index && selectedChoice !== shuffledCorrectIndex && (
                    <span className="choice-mark incorrect-mark"> ✗</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <audio
        ref={audioRef}
        src="/audio/TitleSound.m4a"
        preload="auto"
        autoPlay
        muted={false}
      />
    </div>
  );
}

export default FinalBattle;
