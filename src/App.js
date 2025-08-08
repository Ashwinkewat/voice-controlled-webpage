import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // 🟢 Reference to SpeechRecognition instance
  const recognitionRef = useRef(null);

  // 🟢 State hooks
  const [text, setText] = useState(""); // Stores last recognized voice command
  const [videoVisible, setVideoVisible] = useState(false); // Controls video visibility
  const [imageVisible, setImageVisible] = useState(false); // Controls image visibility
  const [quote, setQuote] = useState(""); // Holds the current motivational quote

  useEffect(() => {
    // 🟢 Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }

    // 🟢 Initialize SpeechRecognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    // 🟢 Handle voice result
    recognition.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript.trim().toLowerCase();
      setText(transcript);
      handleCommand(transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  // 🟢 Handle voice commands
  const handleCommand = (command) => {
    if (command.includes("change background")) {
      setVideoVisible(true);
      document.body.style.backgroundColor = "transparent";
    } else if (command.includes("default")) {
      setVideoVisible(false);
      document.body.style.backgroundColor = "white";
    } else if (command.includes("change text")) {
      setText("The voice command changed this text!");
    } else if (command.includes("show image")) {
      setImageVisible(true);
    } else if (command.includes("hide image")) {
      setImageVisible(false);
    }else if (command.includes("give me advice")) {
  const quotes = [
    "Believe you can and you're halfway there.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "Sometimes later becomes never. Do it now.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  setQuote(randomQuote);

  // Optional: Speak it aloud
  const utterance = new SpeechSynthesisUtterance(randomQuote);
  window.speechSynthesis.speak(utterance);
}

  };

  // 🟢 Start listening to voice
  const startListening = () => {
    recognitionRef.current && recognitionRef.current.start();
  };

  // 🟢 Stop listening to voice
  const stopListening = () => {
    recognitionRef.current && recognitionRef.current.stop();
  };

  return (
    <>
      {/* 🔹 Background Video shown only when voice command says so */}
      {videoVisible && (
        <video autoPlay muted loop id="bg-video">
          <source src="https://videos.pexels.com/video-files/2759477/2759477-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}

      {/* 🔸 Main UI content */}
      <div className="App">
        <div className="heading">
          <h1>🎙️ Voice-Controlled Webpage</h1>
        </div>

        <div className="heading2">
          <p>
            Commands: "change background", "default", "change text", "show image", "hide image"
          </p>
        </div>

        <div className="button-container">
          <button onClick={startListening}>🎤 Start Listening</button>
          <button onClick={stopListening}>🛑 Stop Listening</button>
        </div>

        <h2 className="output-text">{text}</h2>
        {quote && (
  <div className="quote-box">
    <p>{quote}</p>
  </div>
)}

        {/* 🔹 Display image on command */}
        {imageVisible && (
          <div className="image-wrapper">
           <img
  src="https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?_gl=1*1kmo3a2*_ga*NDY5MDE3Nzg1LjE3NTQ0NzEwOTI.*_ga_8JE65Q40S6*czE3NTQ1NjIxMjgkbzMkZzEkdDE3NTQ1NjIxMzEkajU3JGwwJGgw"
  alt="Random"
  className="image-display"
  crossOrigin="anonymous"
/>

          </div>
        )}
      </div>
    </>
  );
}

export default App;

