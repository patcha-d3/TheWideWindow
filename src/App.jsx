import { useState } from "react";
import WordOrderGame from "./components/WordOrderGame.jsx";
import PageFlip from "./components/PageFlip.jsx";
import TitlePage from "./components/TitlePage.jsx";
import IntroStory from "./components/IntroStory.jsx";
import MeetJosephine from "./components/03_MeetJosephine.jsx";
import MeetCaptain from "./components/04_MeetCaptain.jsx";
import Disappear from "./components/05_Disappear.jsx";
import OntheWay from "./components/06_OntheWay.jsx";
import Cave from "./components/07_Cave.jsx";
import Sailing from "./components/08_Sailing.jsx";
import Collapse from "./components/09_Collapse.jsx";
import DuelSham from "./components/10_DuelSham.jsx";
import FinalBattle from "./components/11_FinalBattle.jsx";
import Ending from "./components/12_Ending.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("title"); // "title", "intro", "meetJosephine", "game", "meetCaptain", "disappear", "ontheWay", "cave", "sailing", "ending"
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
    navigateToPage("meetJosephine");
  };

  const handleIntroLeave = () => {
    navigateToPage("title");
  };

  const handleIntroBack = () => {
    navigateToPage("title");
  };

  const handleMeetJosephineContinue = () => {
    navigateToPage("game");
  };

  const handleMeetJosephineBack = () => {
    navigateToPage("intro");
  };

  const handleGameBack = () => {
    navigateToPage("meetJosephine");
  };

  const handleGameContinue = () => {
    navigateToPage("meetCaptain");
  };

  const handleMeetCaptainBack = () => {
    navigateToPage("game");
  };

  const handleMeetCaptainContinue = () => {
    navigateToPage("disappear");
  };

  const handleDisappearBack = () => {
    navigateToPage("meetCaptain");
  };

  const handleDisappearContinue = () => {
    navigateToPage("ontheWay");
  };

  const handleOntheWayBack = () => {
    navigateToPage("disappear");
  };

  const handleOntheWayContinue = () => {
    navigateToPage("cave");
  };

  const handleCaveBack = () => {
    navigateToPage("ontheWay");
  };

  const handleCaveContinue = () => {
    navigateToPage("sailing");
  };

  const handleSailingBack = () => {
    navigateToPage("cave");
  };

  const handleSailingContinue = () => {
    navigateToPage("collapse");
  };

  const handleCollapseContinue = () => {
    navigateToPage("duelSham");
  };

  const handleCollapseBack = () => {
    navigateToPage("sailing");
  };

  const handleDuelShamContinue = () => {
    navigateToPage("finalBattle");
  };

  const handleDuelShamBack = () => {
    navigateToPage("collapse");
  };

  const handleFinalBattleContinue = () => {
    navigateToPage("ending");
  };

  const handleFinalBattleBack = () => {
    navigateToPage("duelSham");
  };

  const handleEndingBack = () => {
    navigateToPage("sailing");
  };

  const handleEndingBackToTitle = () => {
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
        onBack={handleIntroBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "meetJosephine") {
    return (
      <MeetJosephine
        onContinue={handleMeetJosephineContinue}
        onBack={handleMeetJosephineBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "meetCaptain") {
    return (
      <MeetCaptain
        onContinue={handleMeetCaptainContinue}
        onBack={handleMeetCaptainBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "disappear") {
    return (
      <Disappear
        onContinue={handleDisappearContinue}
        onBack={handleDisappearBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "ontheWay") {
    return (
      <OntheWay
        onContinue={handleOntheWayContinue}
        onBack={handleOntheWayBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "cave") {
    return (
      <Cave
        onContinue={handleCaveContinue}
        onBack={handleCaveBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "sailing") {
    return (
      <Sailing
        onContinue={handleSailingContinue}
        onBack={handleSailingBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "collapse") {
    return (
      <Collapse
        onContinue={handleCollapseContinue}
        onBack={handleCollapseBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "duelSham") {
    return (
      <DuelSham
        onContinue={handleDuelShamContinue}
        onBack={handleDuelShamBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "finalBattle") {
    return (
      <FinalBattle
        onContinue={handleFinalBattleContinue}
        onBack={handleFinalBattleBack}
        isFadingOut={isFadingOut}
        isFadingIn={isFadingIn}
      />
    );
  }

  if (currentPage === "ending") {
    return (
      <Ending
        onBackToTitle={handleEndingBackToTitle}
        onBack={handleEndingBack}
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
      <WordOrderGame onBack={handleGameBack} onContinue={handleGameContinue} />
    </PageFlip>
  );
}

export default App;

