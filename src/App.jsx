import { useState } from "react";
import WordOrderGame from "./components/WordOrderGame.jsx";
import PageFlip from "./components/PageFlip.jsx";
import TitlePage from "./components/TitlePage.jsx";
import IntroStory from "./components/IntroStory.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("title"); // "title", "intro", "game"
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  const navigateToPage = (page) => {
    setIsFadingOut(true);
    // Wait for fade-out animation to complete before navigating
    setTimeout(() => {
      setCurrentPage(page);
      setIsFadingOut(false);
      setIsFadingIn(true);
      // Fade in the new screen
      setTimeout(() => {
        setIsFadingIn(false);
      }, 500); // Match the fadeIn animation duration
    }, 500); // Match the fadeOut animation duration
  };

  const handleStartGame = () => {
    navigateToPage("intro");
  };

  const handleIntroReady = () => {
    navigateToPage("game");
  };

  const handleIntroLeave = () => {
    navigateToPage("title");
  };

  const handleNavigateToTitle = () => {
    navigateToPage("title");
  };

  if (currentPage === "title") {
    return (
      <TitlePage 
        onContinue={handleStartGame} 
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "intro") {
    return (
      <IntroStory
        onReady={handleIntroReady}
        onLeave={handleIntroLeave}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  return (
    <PageFlip 
      onNavigateToTitle={handleNavigateToTitle} 
      isFadingOut={isFadingOut}
      isFadingIn={isFadingIn}
    >
      <WordOrderGame />
    </PageFlip>
  );
}

export default App;

