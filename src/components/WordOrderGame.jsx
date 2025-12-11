import { useState, useEffect } from "react";
import "./WordOrderGame.css";

const correctSentence = [
  "Aunt Josephine",
  "seemed",
  "frightened",
  "of",
  "anything",
  "related to",
  "Lake Lachrymose",
];

// Function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function WordOrderGame({ onBack, onContinue }) {
  const [words, setWords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // Initialize with shuffled words
  useEffect(() => {
    setWords(shuffleArray(correctSentence));
    setFeedback("");
    setShowContinue(false);
  }, []);

  // Auto-check when words change
  useEffect(() => {
    if (words.length === 0) return;

    const isCorrect =
      words.length === correctSentence.length &&
      words.every((word, index) => word === correctSentence[index]);

    if (isCorrect) {
      setFeedback("Correct!");
      // Show continue button after a delay
      setTimeout(() => {
        setShowContinue(true);
      }, 1000);
    } else {
      setFeedback("");
      setShowContinue(false);
    }
  }, [words]);

  // Handle word click to reorder
  const handleWordClick = (index) => {
    if (selectedIndex === null) {
      // First click: select word
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      // Click same word: deselect
      setSelectedIndex(null);
    } else {
      // Second click: swap positions
      const newWords = [...words];
      [newWords[selectedIndex], newWords[index]] = [
        newWords[index],
        newWords[selectedIndex],
      ];
      setWords(newWords);
      setSelectedIndex(null);
    }
  };

  // Handle drag start
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.target.style.opacity = "0.5";
  };

  // Handle drag enter
  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    // Only clear if we're actually leaving the element (not entering a child)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  // Handle drop
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newWords = [...words];
    const draggedWord = newWords[draggedIndex];
    newWords.splice(draggedIndex, 1);
    newWords.splice(dropIndex, 0, draggedWord);
    setWords(newWords);
    setDraggedIndex(null);
    setDragOverIndex(null);
    setSelectedIndex(null);
  };

  // Handle drag end
  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Handle continue to next level
  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      console.log("Continue to next level");
    }
  };

  return (
    <div className="word-order-game">
      <button className="back-button" onClick={onBack || (() => {})}>
        ←
      </button>
      {showContinue && (
        <button className="next-button" onClick={handleContinue}>
          →
        </button>
      )}
        <div className="game-container">
        <h1 className="game-title">Form the correct sentence</h1>
        <p className="game-instruction">
        Click the words to reorder them, or drag and drop to arrange them according to proper grammar.
        </p>

        <div className="words-container">
          {words.map((word, index) => {
            // Show drop line before if dragging from right to left (will insert before this word)
            const showDropLineBefore =
              dragOverIndex === index &&
              draggedIndex !== null &&
              draggedIndex > index;
            // Show drop line after if dragging from left to right (will insert after this word)
            const showDropLineAfter =
              dragOverIndex === index &&
              draggedIndex !== null &&
              draggedIndex < index;

            return (
              <div key={`${word}-${index}`} style={{ position: "relative" }}>
                {showDropLineBefore && (
                  <div className="drop-line drop-line-before"></div>
                )}
                <div
                  className={`word-item ${
                    selectedIndex === index ? "selected" : ""
                  } ${draggedIndex === index ? "dragging" : ""} ${
                    dragOverIndex === index && draggedIndex !== null
                      ? "drag-over"
                      : ""
                  }`}
                  onClick={() => handleWordClick(index)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnter={(e) => handleDragEnter(e, index)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  {word}
                </div>
                {showDropLineAfter && (
                  <div className="drop-line drop-line-after"></div>
                )}
              </div>
            );
          })}
        </div>

        {selectedIndex !== null && (
          <p className="hint-text">
            คลิกคำอื่นเพื่อสลับตำแหน่ง หรือคลิกคำเดิมอีกครั้งเพื่อยกเลิก
          </p>
        )}

        {feedback && (
          <div className="feedback feedback-correct">
            {feedback}
          </div>
        )}

        <button
          className="hint-button"
          onClick={() => setShowHint(!showHint)}
        >
          Hint
        </button>

        {showHint && (
          <div className="hint-message">
            Subject + linking verb + adjective + prepositional phrase (+ noun phrase modifier)
          </div>
        )}
      </div>
    </div>
  );
}

export default WordOrderGame;

