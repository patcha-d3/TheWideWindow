import { useEffect, useRef } from "react";
import St from "page-flip";
import "./PageFlip.css";
import LogoButton from "./LogoButton.jsx";

function PageFlip({ children, onNavigateToTitle, isFadingOut, isFadingIn }) {
  const pageFlipRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      console.log("PageFlip: containerRef.current is null");
      return;
    }

    console.log("PageFlip: Initializing...", containerRef.current);

    // Wait a bit for DOM to be ready
    const timer = setTimeout(() => {
      if (!containerRef.current) {
        console.log("PageFlip: containerRef.current is null after timeout");
        return;
      }

      try {
        console.log("PageFlip: Creating PageFlip instance...");
        // Initialize page flip
        const pageFlip = new St.PageFlip(containerRef.current, {
          width: 1920,
          height: 1080,
          minWidth: 315,
          maxWidth: 1920,
          minHeight: 420,
          maxHeight: 1080,
          maxShadowOpacity: 0.5,
          showCover: true,
          mobileScrollSupport: false,
        });

        console.log("PageFlip: Loading images...");
        // Load images
        pageFlip.loadFromImages(["/images/cp-4.png"]);

        pageFlipRef.current = pageFlip;
        console.log("PageFlip: Initialized successfully");
      } catch (error) {
        console.error("PageFlip initialization error:", error);
      }
    }, 500);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch (error) {
          console.error("PageFlip cleanup error:", error);
        }
      }
    };
  }, []);

  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";
  
  return (
    <div className={`page-flip-container ${fadeClass}`}>
      {onNavigateToTitle && (
        <LogoButton onNavigate={onNavigateToTitle} />
      )}
      <div className="page-flip-content">
        {children}
      </div>
      <div ref={containerRef} className="page-flip-wrapper"></div>
    </div>
  );
}

export default PageFlip;

