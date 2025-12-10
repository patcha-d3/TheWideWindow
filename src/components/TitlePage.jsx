import { useEffect, useRef, useState } from "react";
import "./TitlePage.css";

function TitlePage({ onContinue, isFadingOut, isFadingIn }) {
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";
  const audioRef = useRef(null);
  const audioStartedRef = useRef(false);
  const [showCredit, setShowCredit] = useState(false);
  
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
  
  // Handle click to continue and ensure audio plays
  const handleClick = () => {
    if (showCredit) return; // Don't continue if credit modal is open
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

  // Handle credit button click
  const handleCreditClick = (e) => {
    e.stopPropagation(); // Prevent triggering handleClick
    setShowCredit(true);
  };

  // Handle close credit modal
  const handleCloseCredit = (e) => {
    e.stopPropagation(); // Prevent triggering handleClick
    setShowCredit(false);
  };
  
  return (
    <div className={`title-page ${fadeClass}`} onClick={handleClick}>
      <div className="title-background">
        <img 
          src="/images/scene_title_blank.png" 
          alt="Title Background" 
          className="background-image"
        />
      </div>
      <div className="title-water-container">
        <img 
          src="/images/scene_title_water.png" 
          alt="Water" 
          className="water-image"
        />
      </div>
      <div className="title-logo-container">
        <img 
          src="/images/logo.svg" 
          alt="A Series of Unfortunate Events" 
          className="title-logo"
        />
      </div>
      <div className="title-home-container">
        <img 
          src="/images/home.png" 
          alt="Home" 
          className="title-home"
        />
      </div>
      <div className="title-grain-overlay">
        <img 
          src="/images/grain.png" 
          alt="Grain Texture" 
          className="grain-image"
        />
      </div>
      <div className="title-click-hint">
        Start Game
      </div>
      <button 
        className="title-credit-button"
        onClick={handleCreditClick}
      >
        Credit
      </button>
      {showCredit && (
        <div className="credit-modal-overlay" onClick={handleCloseCredit}>
          <div className="credit-modal" onClick={(e) => e.stopPropagation()}>
            <button className="credit-close-button" onClick={handleCloseCredit}>
              ×
            </button>
            <h2 className="credit-title">Credits</h2>
            <div className="credit-content">
              <div className="credit-item">
                <div className="credit-label">Game Design</div>
                <div className="credit-value">Pat Sricome</div>
              </div>
              <div className="credit-item">
                <div className="credit-label">Original Book</div>
                <div className="credit-value">A Series of Unfortunate Events: The Wide Window (Book 3)</div>
              </div>
              <div className="credit-item">
                <div className="credit-label">Author</div>
                <div className="credit-value">Lemony Snicket</div>
              </div>
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

export default TitlePage;
