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
  const timerRef = useRef(null); // Referencia al temporizador

  useEffect(() => {
    initializeTimer();
  }, [focusTime, breakTime, longBreakTime, currentPhase]);

  // Inicializar el temporizador según la fase actual
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

  // Iniciar o pausar el temporizador
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current); // Detener el temporizador
      timerRef.current = null;
      setIsRunning(false);
    } else {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(timerRef.current); // Detener al llegar a 0
          timerRef.current = null;
          switchPhase();
          return 0;
        });
      }, 1000);
    }
  };

  // Cambiar la fase actual y reiniciar el temporizador
  const switchPhase = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    timerRef.current = null;

    if (currentPhase === "focus") {
      setCurrentPhase("break");
      setTimeRemaining(breakTime * 60);
    } else if (currentPhase === "break") {
      setCurrentPhase("longbreak");
      setTimeRemaining(longBreakTime * 60);
    } else {
      setCurrentPhase("focus");
      setTimeRemaining(focusTime * 60);
    }
  };

  // Reiniciar el temporizador
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
    setCurrentPhase("focus");
    initializeTimer();
  };

  // Mostrar el tiempo restante en formato mm:ss
  const updateTimeDisplay = () => {
    const clampedTime = Math.max(0, timeRemaining); // Evitar números negativos
    const minutes = Math.floor(clampedTime / 60);
    const seconds = clampedTime % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Validar cambios en los inputs
  const handleTimeChange = (setter) => (e) => {
    const value = parseInt(e.target.value, 10);
    setter(isNaN(value) || value < 0 ? 0 : value);
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
              <input
                type="number"
                min="0"
                value={focusTime || ""}
                onChange={handleTimeChange(setFocusTime)}
              />
            </div>
            <div className="form-group">
              <img id="coffe-icon" src={coffe} alt="Break time" />
              <label>Break</label>
              <input
                type="number"
                min="0"
                value={breakTime || ""}
                onChange={handleTimeChange(setBreakTime)}
              />
            </div>
            <div className="form-group">
              <img id="couch-icon" src={couch} alt="Long break time" />
              <label>Long Break</label>
              <input
                type="number"
                min="0"
                value={longBreakTime || ""}
                onChange={handleTimeChange(setLongBreakTime)}
              />
            </div>
          </div>

          <div className="timer-buttons">
            <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
            <button
              onClick={() => {
                if (isRunning) {
                  switchPhase(); // Cambiar a la siguiente fase si está corriendo
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
