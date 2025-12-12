import { useEffect, useRef, useState } from "react";
import "./11_FinalBattle.css";

function FinalBattle({ onContinue, onBack, isFadingOut, isFadingIn }) {
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";
  const audioRef = useRef(null);
  const audioStartedRef = useRef(false);
  const [showCharSham, setShowCharSham] = useState(false);
  
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

    return () => {
      clearTimeout(charTimer);
    };
  }, []);

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
              className="final-battle-boat"
            />
          </div>
        </div>
        <div className="final-battle-center-column">
          {showCharSham && (
            <div className="final-battle-character-container">
              <img 
                src="/images/char_sham.png" 
                alt="Captain Sham" 
                className="final-battle-character"
              />
            </div>
          )}
        </div>
        <div className="final-battle-right-column">
        </div>
      </div>
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
