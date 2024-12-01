import React, { useState, useRef, useEffect } from "react";
import "../styles/pomodoro.css";
import coffe from "../assets/images/coffe.svg";
import work from "../assets/images/work.svg";
import couch from "../assets/images/couch.svg";
import tomato from "../assets/images/tomato.svg"; 

const PomodoroTimer = () => {
  const [focusTime, setFocusTime] = useState(20);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(30);
  const [pomodorosAmount, setPomodorosAmount] = useState(4);
  const [cyclesRemaining, setCyclesRemaining] = useState(pomodorosAmount);
  const [timeRemaining, setTimeRemaining] = useState(focusTime * 60);
  const [currentPhase, setCurrentPhase] = useState("focus");
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    initializeTimer();
  }, [focusTime, breakTime, longBreakTime, currentPhase, pomodorosAmount]);

  useEffect(() => {
    if (!isRunning) {
      initializeTimer();
    }
    updateWaterStyles();
  }, [focusTime, breakTime, longBreakTime, currentPhase, timeRemaining]);

  const initializeTimer = () => {
    let time = 0;
    switch (currentPhase) {
      case "focus":
        time = focusTime > 0 ? focusTime * 60 : 0;
        break;
      case "break":
        time = breakTime > 0 ? breakTime * 60 : 0;
        break;
      case "longbreak":
        time = longBreakTime > 0 ? longBreakTime * 60 : 0;
        break;
      default:
        break;
    }
    setTimeRemaining(time);
  };

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(timerRef.current);
          timerRef.current = null;
          switchPhase(); // Automatically switch to the next phase
          return 0;
        });
      }, 1000);
    }
  };

  const switchPhase = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    timerRef.current = null;
  
    if (currentPhase === "focus") {
      if (cyclesRemaining > 1) {
        // Transition to short break and decrement remaining cycles
        setCurrentPhase("break");
        setTimeRemaining(breakTime * 60);
        setCyclesRemaining((prev) => prev - 1);
      } else {
        // Transition to long break and reset cycle count
        setCurrentPhase("longbreak");
        setTimeRemaining(longBreakTime * 60);
        setCyclesRemaining(pomodorosAmount);
      }
    } else if (currentPhase === "break") {
      // Return to focus phase
      setCurrentPhase("focus");
      setTimeRemaining(focusTime * 60);
    } else if (currentPhase === "longbreak") {
      // After long break, return to focus and restart cycles
      setCurrentPhase("focus");
      setTimeRemaining(focusTime * 60);
      setCyclesRemaining(pomodorosAmount);
    }
  
    toggleTimer(); // Automatically start the timer for the next phase
  };
  

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
    setCurrentPhase("focus");
    setCyclesRemaining(pomodorosAmount);
    initializeTimer();
  };

  const updateTimeDisplay = () => {
    const clampedTime = Math.max(0, timeRemaining);
    const hours = Math.floor(clampedTime / 3600);
    const minutes = Math.floor((clampedTime % 3600) / 60);
    const seconds = clampedTime % 60;
    return hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleTimeChange = (setter) => (e) => {
    const value = parseInt(e.target.value, 10);
    setter(isNaN(value) || value < 0 ? 0 : value);
  };

  const handlePomodoroChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const newPomodoros = isNaN(value) || value < 0 ? 0 : value;
    setPomodorosAmount(newPomodoros);
    setCyclesRemaining(newPomodoros);
  };

  const getWaterHeight = () => {
    const maxTime =
      currentPhase === "focus"
        ? focusTime * 60
        : currentPhase === "break"
        ? breakTime * 60
        : longBreakTime * 60;
    const percentage = (timeRemaining / maxTime) * 100;
    return `${percentage}%`;
  };

  const updateWaterStyles = () => {
    const root = document.documentElement;
    const color =
      currentPhase === "focus"
        ? "#ff7b61" // Red for focus
        : currentPhase === "break"
        ? "#4ea4ff" // Blue for short break
        : "#7ab854"; // Green for long break
  
    root.style.setProperty("--water-height", getWaterHeight());
    root.style.setProperty("--water-color", color); // Update water color
  };
  

  useEffect(() => {
    document.title = `Pomodoro | ${currentPhase === "focus" ? "Focus" : "Break"}`;
  }, [currentPhase]);

  return (
    <div className="pomodoro-timer">
      <main>
        <div className="time-container">
          <h3>
            {currentPhase === "focus"
              ? "Focus Time"
              : currentPhase === "break"
              ? "Break Time"
              : "Long Break Time"}
          </h3>
          <p className="time">{updateTimeDisplay()}</p>
        </div>
        <div className="timer-settings">
          <div className="timer-parameters">
            <div className="form-group">
              <img id="focus-icon" src={work} alt="Focus time" />
              <label>Focus</label>
              <input id="focus-setter"
                type="number"
                min="0"
                value={focusTime || ""}
                onChange={handleTimeChange(setFocusTime)}
              />
            </div>
            <div className="form-group">
              <img id="coffe-icon" src={coffe} alt="Break time" />
              <label>Break</label>
              <input id="break-setter"
                type="number"
                min="0"
                value={breakTime || ""}
                onChange={handleTimeChange(setBreakTime)}
              />
            </div>
            <div className="form-group">
              <img id="couch-icon" src={couch} alt="Long break time" />
              <label>Long Break</label>
              <input id="longbreak-setter"
                type="number"
                min="0"
                value={longBreakTime || ""}
                onChange={handleTimeChange(setLongBreakTime)}
              />
            </div>
            <div className="form-group">
              <img id="tomato-icon" src={tomato} alt="Pomodoro amount" />
              <label>Pomodoro #</label>
              <input id="pomodoro-setter"
                type="number"
                min="0"
                value={pomodorosAmount || ""}
                onChange={handlePomodoroChange}
              />
            </div>
          </div>
          <div className="timer-buttons">
            <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
            <button
              onClick={() => {
                if (isRunning) {
                  switchPhase();
                } else {
                  if (window.confirm("¿Seguro que quieres reiniciar el temporizador?")) {
                    resetTimer();
                  }
                }
              }}
            >
              {isRunning ? "Skip" : "Reset"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PomodoroTimer;
