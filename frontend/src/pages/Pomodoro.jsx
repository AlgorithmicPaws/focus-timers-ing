import React, { useState, useRef, useEffect } from "react";
import "../styles/pomodoro.css";
import coffe from "../assets/images/coffe.svg";
import work from "../assets/images/work.svg";
import couch from "../assets/images/couch.svg";

const PomodoroTimer = () => {
  const [focusTime, setFocusTime] = useState(20);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(30);
  const [timeRemaining, setTimeRemaining] = useState(focusTime * 60);
  const [currentPhase, setCurrentPhase] = useState("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (!isRunning) {
      initializeTimer();
    }
  }, [focusTime, breakTime, longBreakTime, currentPhase]);

  const initializeTimer = () => {
    let time = 0;
    switch (currentPhase) {
      case "focus":
        time = focusTime ? focusTime * 60 : 0;
        break;
      case "break":
        time = breakTime ? breakTime * 60 : 0;
        break;
      case "longbreak":
        time = longBreakTime ? longBreakTime * 60 : 0;
        break;
      default:
        break;
    }
    setTimeRemaining(time);
  };

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timer);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      const newTimer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(newTimer);
          switchPhase();
          return 0;
        });
      }, 1000);
      setTimer(newTimer);
    }
  };

  const switchPhase = () => {
    setIsRunning(false);
    clearInterval(timer);
    if (currentPhase === "focus") {
      setCurrentPhase("break");
    } else if (currentPhase === "break") {
      setCurrentPhase("longbreak");
    } else {
      setCurrentPhase("focus");
    }
  };

  const resetTimer = () => {
    clearInterval(timer);
    setIsRunning(false);
    setCurrentPhase("focus");
    initializeTimer();
  };

  const updateTimeDisplay = () => {
    if (timeRemaining <= 0) {
      return "00:00";
    }
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  
  
  return (
    <div className="pomodoro-timer">
      <main>
        <div className="time-container">
          <h3>{currentPhase === "focus" ? "Focus Time" : currentPhase === "break" ? "Break Time" : "Long Break Time"}</h3>
          <p className="time">{updateTimeDisplay()}</p>
        </div>
        <div className="timer-settings">
          <div className="timer-parameters"> 

            <div className="form-group">
              <img id="focus-icon" src={work} alt="Focus time"></img>
              <label>Focus</label>
              <input
                type="number"
                min="0"
                value={focusTime || ""} 
                onChange={(e) => setFocusTime(e.target.value === "" ? 0 : parseInt(e.target.value))}
              />
            </div>
            <div className="form-group">
              <img id="coffe-icon" src={coffe} alt="Break time"></img>  
              <label>Break</label>
              <input
                type="number"
                min="0"
                value={breakTime || ""}
                onChange={(e) => setBreakTime(e.target.value === "" ? 0 : parseInt(e.target.value))}
              />
            </div>

            <div className="form-group">
              <img id="couch-icon" src={couch} alt="Long break time"></img> 
              <label>Long Break</label>
              <input
                type="number"
                min="0"
                value={longBreakTime || ""}
                onChange={(e) => setLongBreakTime(e.target.value === "" ? 0 : parseInt(e.target.value))}
              />
            </div>

          </div>
        
          <div className="timer-buttons">
            <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
            <button onClick={resetTimer}>Reset</button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PomodoroTimer;
