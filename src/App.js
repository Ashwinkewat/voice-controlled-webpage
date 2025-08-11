import { useState } from "react";
import { COMMANDS } from "./data/commands";
import { QUOTES } from "./data/quotes";
import { DESCRIPTION_1, DESCRIPTION_2 } from "./data/descriptions";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import useTextToSpeech from "./hooks/useTextToSpeech";
import BackgroundVideo from "./components/BackgroundVideo";
import DescriptionBox from "./components/DescriptionBox";
import ControlButtons from "./components/ControlButtons";
import QuoteBox from "./components/QuoteBox";
import ImageDisplay from "./components/ImageDisplay";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [videoVisible, setVideoVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [quote, setQuote] = useState("");
  const [description, setDescription] = useState(DESCRIPTION_1);
  const [showNavbar, setShowNavbar] = useState(false);
  const speakText = useTextToSpeech();

  const handleCommand = (command) => {
    setText(command);
    const foundCommand = Object.keys(COMMANDS).find((key) =>
      COMMANDS[key].some((phrase) => command.includes(phrase))
    );

    switch (foundCommand) {
      case "changeBackground":
        if (!videoVisible) {
          setVideoVisible(true);
          document.body.style.backgroundColor = "transparent";
        } else {
          speakText("Say 'default' to reset to white screen.");
        }
        break;

      case "defaultBackground":
        setVideoVisible(false);
        document.body.style.backgroundColor = "white";
        break;

      case "changeText":
        setDescription((prev) =>
          prev === DESCRIPTION_1 ? DESCRIPTION_2 : DESCRIPTION_1
        );
        break;

      case "showImage":
        setImageVisible(true);
        break;

      case "hideImage":
        setImageVisible(false);
        break;

      case "giveAdvice":
      case "showQuote":
        giveRandomQuote();
        break;

      default:
        break;
    }
  };
    const giveRandomQuote = () => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(randomQuote);
    speakText(randomQuote);
  };

  const { startListening, stopListening } =
    useSpeechRecognition(handleCommand);

  return (
    <>
      {videoVisible && <BackgroundVideo />}

      <div className="App">
        <div className="heading">
          <h1>🎙️ Voice-Controlled Webpage</h1>
        </div>

        <DescriptionBox
          description={description}
          isChanged={description === DESCRIPTION_2}
        />

        <ControlButtons onStart={startListening} onStop={stopListening} />

        <h2 className="output-text">{text}</h2>

        {quote && <QuoteBox quote={quote} />}

        {imageVisible && <ImageDisplay />}
      </div>
      <div>
    {/* Temporary toggle button */}
    <button className="navbutton" onClick={() => setShowNavbar((prev) => !prev)}>
        Commands list
      </button>

      {/* Navbar component */}
      <Navbar show={showNavbar} /></div>
      
    </>
  );
}

export default App;
