import "./LogoButton.css";

function LogoButton({ onNavigate }) {
  const handleClick = () => {
    // Trigger navigation which will handle the fade-out
    onNavigate();
  };

  return (
    <div 
      className="logo-button"
      onClick={handleClick}
    >
      <img 
        src="/images/logo.svg" 
        alt="A Series of Unfortunate Events" 
        className="logo-button-image"
      />
    </div>
  );
}

export default LogoButton;
