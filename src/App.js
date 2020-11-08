import React, { useState, useEffect, useRef } from "react";

function App() {
  const STARTING_TIME = 10;

  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const inputRef = useRef(null);

  function handleChange(event) {
    const { value } = event.target;
    setText(value);
  }

  function handleWordCount(text) {
    const wordArr = text.trim().split(" ");
    return wordArr.filter((word) => word !== "").length;
  }

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText("");
    inputRef.current.disabled = false;
    inputRef.current.focus();
  }

  function endGame() {
    setIsTimeRunning(false);
    setWordCount(handleWordCount(text));
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      handleWordCount(text);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [isTimeRunning, timeRemaining]);

  return (
    <div className="app">
      <div className="app-container">
        <h1>How fast do you type</h1>
        <textarea ref={inputRef} value={text} onChange={handleChange} disabled={!isTimeRunning} />
        <h4>Time reminaing: {timeRemaining}s</h4>
        <button onClick={startGame} disabled={isTimeRunning}>
          Start
        </button>
        <h1>Word Count: {wordCount}</h1>
      </div>
    </div>
  );
}

export default App;
