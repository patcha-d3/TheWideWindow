import { useEffect, useRef, useState } from "react";
import "./10_DuelSham.css";

function DuelSham({ onContinue, onBack, isFadingOut, isFadingIn }) {
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";
  const audioRef = useRef(null);
  const audioStartedRef = useRef(false);
  const [showCharSham, setShowCharSham] = useState(false);
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [isChatBubbleClicked, setIsChatBubbleClicked] = useState(false);
  const [showShoutingBubble, setShowShoutingBubble] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
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

  useEffect(() => {
    // Show char_sham after a short delay
    const charTimer = setTimeout(() => {
      setShowCharSham(true);
    }, 500);

    // Show chat bubble after char_sham appears (with fade in animation ~1s)
    const chatTimer = setTimeout(() => {
      setShowChatBubble(true);
    }, 1500); // 0.5s + 1s for char fade in

    return () => {
      clearTimeout(charTimer);
      clearTimeout(chatTimer);
    };
  }, []);

  useEffect(() => {
    // Show final image 4 seconds after shouting bubble appears
    if (showShoutingBubble) {
      const finalTimer = setTimeout(() => {
        setShowFinalImage(true);
        // Show buttons after final image animation completes (2 seconds)
        setTimeout(() => {
          setShowButtons(true);
        }, 2000);
      }, 4000);

      return () => {
        clearTimeout(finalTimer);
      };
    }
  }, [showShoutingBubble]);
  
  // Handle click on chat bubble
  const handleChatBubbleClick = () => {
    if (!isChatBubbleClicked) {
      setIsChatBubbleClicked(true);
      // Hide chat bubble with fade out
      setShowChatBubble(false);
      // Show shouting bubble after fade out completes
      setTimeout(() => {
        setShowShoutingBubble(true);
      }, 300); // Match fade out duration
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
    <div className={`duel-sham ${fadeClass}`}>
      <div className="duel-sham-background">
        <img 
          src="/images/09_bg.png" 
          alt="Duel Sham Background" 
          className="background-image"
        />
      </div>
      <div className="duel-sham-water-container">
        <img 
          src="/images/09_water.png" 
          alt="Water" 
          className="water-image"
        />
      </div>
      <div className="duel-sham-grain-overlay">
        <img 
          src="/images/grain.png" 
          alt="Grain Texture" 
          className="grain-image"
        />
      </div>
      <div className="duel-sham-layout">
        <div className="duel-sham-left-column">
          <div className="duel-sham-boat-container">
            <img 
              src="/images/06_boat.svg" 
              alt="Boat" 
              className="duel-sham-boat"
            />
            {showShoutingBubble && (
              <div className="duel-sham-shouting-bubble">
                <div className="duel-sham-shouting-bubble-text">
                  There is no way you can do that!
                </div>
                <div className="duel-sham-shouting-bubble-tail"></div>
              </div>
            )}
          </div>
        </div>
        <div className="duel-sham-center-column">
          {showCharSham && (
            <div className="duel-sham-character-container">
              <img 
                src="/images/char_sham.png" 
                alt="Captain Sham" 
                className="duel-sham-character"
              />
            </div>
          )}
          {showChatBubble && showCharSham && (
            <div 
              className={`duel-sham-chat-bubble ${isChatBubbleClicked ? 'fade-out' : ''}`}
              onClick={handleChatBubbleClick}
              style={{ cursor: 'pointer' }}
            >
              <div className="duel-sham-chat-bubble-text">
                So that's my boat… and so that's Aunt Josephine—still alive.
                <br />
                Too bad. She won't be alive long enough to reach the shore.
              </div>
              {!isChatBubbleClicked && (
                <div className="duel-sham-chat-bubble-hint">
                  Click to continue
                </div>
              )}
              <div className="duel-sham-chat-bubble-tail"></div>
            </div>
          )}
        </div>
        <div className="duel-sham-right-column">
        </div>
      </div>
      {showFinalImage && (
        <div className="duel-sham-final-container">
          <img 
            src="/images/final.svg" 
            alt="Final" 
            className="duel-sham-final-image"
          />
        </div>
      )}
      {showButtons && (
        <>
          <button className="back-button" onClick={onBack}>
            ←
          </button>
          <button className="next-button" onClick={handleContinue}>
            →
          </button>
        </>
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

export default DuelSham;
