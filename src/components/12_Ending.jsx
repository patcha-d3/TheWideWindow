import { useState, useEffect } from "react";
import "./12_Ending.css";

function Ending({ onBackToTitle, onBack, isFadingOut, isFadingIn }) {
  const [showCredit1, setShowCredit1] = useState(false);
  const [showClickHint1, setShowClickHint1] = useState(false);
  const [credit1Scrolling, setCredit1Scrolling] = useState(false);
  const [showCredit2, setShowCredit2] = useState(false);
  const [showClickHint2, setShowClickHint2] = useState(false);
  const [credit2Scrolling, setCredit2Scrolling] = useState(false);
  const [showTheEnd, setShowTheEnd] = useState(false);
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";

  useEffect(() => {
    // Show first credit after page loads
    const timer = setTimeout(() => {
      setShowCredit1(true);
      setTimeout(() => {
        setShowClickHint1(true);
      }, 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCredit1Click = () => {
    if (!credit1Scrolling) {
      setShowClickHint1(false);
      setCredit1Scrolling(true);
      // After scroll animation completes, show second credit
      setTimeout(() => {
        setShowCredit1(false);
        setShowCredit2(true);
        setTimeout(() => {
          setShowClickHint2(true);
        }, 1000);
      }, 3000);
    }
  };

  const handleCredit2Click = () => {
    if (!credit2Scrolling) {
      setShowClickHint2(false);
      setCredit2Scrolling(true);
      // After scroll animation completes, show The End
      setTimeout(() => {
        setShowCredit2(false);
        setShowTheEnd(true);
      }, 3000);
    }
  };

  return (
    <div className={`ending ${fadeClass}`}>
      <div className="ending-background">
        <img 
          src="/images/scene_title_blank.png" 
          alt="Background" 
          className="ending-background-image"
        />
      </div>
      <div className="ending-water-container">
        <img 
          src="/images/scene_title_water.png" 
          alt="Water" 
          className="ending-water-image"
        />
      </div>
      <div className="ending-overlay"></div>
      <div className="ending-layout">
        <div className="ending-center-column">
          {showCredit1 && (
            <div 
              className={`ending-credit-container ${credit1Scrolling ? 'scroll-up' : ''}`}
              onClick={handleCredit1Click}
              style={{ cursor: showClickHint1 ? 'pointer' : 'default' }}
            >
              <div className="ending-credit-text">
                Captain Sham—who was, in the end, Count Olaf—refused to believe the children's warning and was dragged into the water by the leeches.
                <br /><br />
                Aunt Josephine, already terrified of the lake and its creatures, grew even more frightened and never wished to face them again. The house she had chosen for its distance from the lake was destroyed by the storm, leaving her with nowhere to return.
                <br /><br />
                In the end, the children and Aunt Josephine agreed to leave the town behind. At last, she would be able to live peacefully, free from fear...
              </div>
              {showClickHint1 && !credit1Scrolling && (
                <div className="ending-click-hint">
                  Click to continue
                </div>
              )}
            </div>
          )}
          {showCredit2 && (
            <div 
              className={`ending-credit-container ${credit2Scrolling ? 'scroll-up' : ''}`}
              onClick={handleCredit2Click}
              style={{ cursor: showClickHint2 ? 'pointer' : 'default' }}
            >
              <div className="ending-credit-text">
                Thank you for playing until the end. I hope you enjoyed this game.
                <br /><br />
                Special thanks to Lemony Snicket for the wonderful book series.
                <br /><br />
                This game was created for educational purposes only as a course project for Design 3.
              </div>
              {showClickHint2 && !credit2Scrolling && (
                <div className="ending-click-hint">
                  Click to continue
                </div>
              )}
            </div>
          )}
          {showTheEnd && (
            <div className="ending-text-container">
              <div className="ending-text">
                The End.
              </div>
            </div>
          )}
          {showTheEnd && onBackToTitle && (
            <div className="ending-button-container">
              <button className="ending-back-to-title-button" onClick={onBackToTitle}>
                Back to title
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ending;
