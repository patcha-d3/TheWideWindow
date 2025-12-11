import "./03_MeetJosephine.css";

function MeetJosephine({ onContinue, isFadingOut, isFadingIn }) {
  const fadeClass = isFadingOut ? "fade-out" : isFadingIn ? "fade-in" : "";

  return (
    <div className={`meet-josephine ${fadeClass}`}>
      <div className="meet-josephine-background">
        <img 
          src="/images/03_bg.png" 
          alt="Background" 
          className="meet-josephine-background-image"
        />
      </div>
      <div className="meet-josephine-layout">
        <div className="meet-josephine-left-column">
          <div className="meet-josephine-characters">
            <img 
              src="/images/char_violet.png" 
              alt="Violet" 
              className="meet-josephine-character meet-josephine-character-violet"
            />
            <img 
              src="/images/char_klaus.png" 
              alt="Klaus" 
              className="meet-josephine-character meet-josephine-character-klaus"
            />
            <img 
              src="/images/char_sunny.png" 
              alt="Sunny" 
              className="meet-josephine-character meet-josephine-character-sunny"
            />
          </div>
        </div>
        <div className="meet-josephine-center-column">
          <div className="meet-josephine-text-container">
            <div className="meet-josephine-text">
              The Baudelaires met Aunt Josephine when they moved into her cliff-side house, where the only thing she trusted and never feared was proper grammar.
              <br /><br />
              She had lost her husband, Ike, when the deadly Lachrymose Leeches attacked him in the lake after smelling food on him.
              <br /><br />
              Since that day, she became terrified of almost everything, especially anything connected to Lake Lachrymose.
            </div>
          </div>
        </div>
        <div className="meet-josephine-right-column">
        </div>
      </div>
    </div>
  );
}

export default MeetJosephine;
