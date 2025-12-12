import { useEffect, useRef, useState } from "react";
import "./09_Collapse.css";

function Collapse({ onContinue, onBack, isFadingOut, isFadingIn }) {
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";
  const audioRef = useRef(null);
  const audioStartedRef = useRef(false);
  const [showText, setShowText] = useState(false);
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
    // Show text after home collapse animation completes (4 seconds)
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 4000);

    // Show buttons after text appears (with fade in animation ~0.8s)
    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, 4800); // 4s + 0.8s for text fade in

    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonsTimer);
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
    <div className={`collapse ${fadeClass}`}>
      <div className="collapse-background">
        <img 
          src="/images/09_bg.png" 
          alt="Collapse Background" 
          className="background-image"
        />
      </div>
      <div className="collapse-water-container">
        <img 
          src="/images/09_water.png" 
          alt="Water" 
          className="water-image"
        />
      </div>
      <div className="collapse-home-container">
        <img 
          src="/images/home.png" 
          alt="Home" 
          className="collapse-home"
        />
      </div>
      <div className="collapse-grain-overlay">
        <img 
          src="/images/grain.png" 
          alt="Grain Texture" 
          className="grain-image"
        />
      </div>
      <div className="collapse-layout">
        <div className="collapse-left-column">
          {showText && (
            <div className="collapse-boat-container">
              <img 
                src="/images/06_boat.svg" 
                alt="Boat" 
                className="collapse-boat"
              />
            </div>
          )}
        </div>
        <div className="collapse-center-column">
          {showText && (
            <div className="collapse-text-container">
              <div className="collapse-text">
                As the Baudelaires and Aunt Josephine neared the shore, they saw that the house on the cliff had been destroyed by the violent storm.
                <br /><br />
                Worse still, there was no time to grieve because something even more terrible was about to happen…
              </div>
            </div>
          )}
        </div>
        <div className="collapse-right-column">
        </div>
      </div>
      {onBack && showButtons && (
        <button className="back-button" onClick={(e) => { e.stopPropagation(); onBack(); }}>
          ←
        </button>
      )}
      {onContinue && showButtons && (
        <button className="next-button" onClick={handleContinue}>
          →
        </button>
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

export default Collapse;
