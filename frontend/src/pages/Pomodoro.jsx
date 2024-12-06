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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");



  useEffect(() => {
    initializeTimer();
    console.log("Timer initialized with:", { focusTime, breakTime, longBreakTime, pomodorosAmount });
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
    console.log("Phase:", currentPhase, "Time initialized to:", time);
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
          switchPhase();
          return 0;
        });
      }, 1000);
    }
    console.log("Timer toggled. Running:", !isRunning);
  };

  const switchPhase = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    timerRef.current = null;
  
    if (currentPhase === "focus") {
      if (cyclesRemaining > 1) {
        setCurrentPhase("break");
        setTimeRemaining(breakTime * 60);
        setCyclesRemaining((prev) => prev - 1);
      } else {
        setCurrentPhase("longbreak");
        setTimeRemaining(longBreakTime * 60);
        setCyclesRemaining(pomodorosAmount);
      }
    } else if (currentPhase === "break") {
      setCurrentPhase("focus");
      setTimeRemaining(focusTime * 60);
    } else if (currentPhase === "longbreak") {
      setIsPopupVisible(true); // Mostrar el popup después del long break
      setCyclesRemaining(pomodorosAmount);
      return; // Detener el contador sin reiniciar
    }
    console.log("Switched to phase:", currentPhase, "Cycles remaining:", cyclesRemaining);
    toggleTimer();
  };
  
  

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
    setCurrentPhase("focus");
    setCyclesRemaining(pomodorosAmount);
    initializeTimer();
    console.log("Timer reset. Focus time:", focusTime, "Pomodoros:", pomodorosAmount);
  };

  const updateTimeDisplay = () => {
    const clampedTime = Math.max(0, timeRemaining);
    const hours = Math.floor(clampedTime / 3600);
    const minutes = Math.floor((clampedTime % 3600) / 60);
    const seconds = clampedTime % 60;
  
    console.log("Minutos restantes:", minutes); // Solo muestra los minutos
  
    return hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  

  const handleTimeChange = (setter) => (e) => {
    const value = parseInt(e.target.value, 10);
    const validValue = isNaN(value) || value < 0 ? 0 : value;
    setter(validValue);
    console.log("Input updated:", validValue);
  };

  const handlePomodoroChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const newPomodoros = isNaN(value) || value < 0 ? 0 : value;
    setPomodorosAmount(newPomodoros);
    setCyclesRemaining(newPomodoros);
    console.log("Pomodoros updated:", newPomodoros);
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
        ? "#ff7b61"
        : currentPhase === "break"
        ? "#4ea4ff"
        : "#7ab854";

    root.style.setProperty("--water-height", getWaterHeight());
    root.style.setProperty("--water-color", color);
  };

  useEffect(() => {
    document.title = `Pomodoro | ${currentPhase === "focus" ? "Focus" : "Break"}`;
  }, [currentPhase]);

  const generatePomodoroData = () => {
    // Sumar todos los tiempos de focus y break
    const totalFocusTime = focusTime * pomodorosAmount;
    
    // Calcular el tiempo total de break teniendo en cuenta los descansos cortos y el largo
    const totalBreakTime = (pomodorosAmount - 1) * breakTime + longBreakTime;
  
    // Crear el objeto de datos
    const pomodoroData = {
      user_id: 0, // Suponiendo que el user_id es 0, debes actualizarlo con el valor real
      date: new Date().toISOString(), // La fecha actual en formato ISO
      focus_time: totalFocusTime,
      break_time: totalBreakTime,
      pomodoro_counter: {
        focus_interval: focusTime,
        short_break_interval: breakTime,
        long_break_interval: longBreakTime,
        number_pomodoros: pomodorosAmount,
      },
    };
  
    console.log(pomodoroData);
    return pomodoroData;
  };
  

  const pomoData = generatePomodoroData();
  console.log(pomoData);

  
  const handleDiscard = () => {
    setIsPopupVisible(false);
  };
  
  const handleSave = () => {
    setIsPopupVisible(false);
    setConfirmationMessage("Session saved successfully");
    console.log(confirmationMessage); // O cualquier otra acción para guardar los datos
  };


  const handlePopupAction = (action) => {
    if (action === "discard") {
      setIsPopupVisible(false); // Cerrar el popup
      resetTimer(); // Reiniciar el temporizador
    } else if (action === "save") {
      // Enviar mensaje de confirmación
      alert("Session saved successfully");
      setIsPopupVisible(false); // Cerrar el popup
    }
  };
  
  
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
                id="focus-setter"
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
                id="break-setter"
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
                id="longbreak-setter"
                type="number"
                min="0"
                value={longBreakTime || ""}
                onChange={handleTimeChange(setLongBreakTime)}
              />
            </div>
            <div className="form-group">
              <img id="tomato-icon" src={tomato} alt="Pomodoro amount" />
              <label>Pomodoro #</label>
              <input
                id="pomodoro-setter"
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
                  if (window.confirm("Are you sure you want to reset the timer?")) {
                    resetTimer();
                  }
                }
              }}
            >
              {isRunning ? "Skip" : "Reset"}
            </button>
          </div>
        </div>
        {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h3>Session Complete</h3>
            <div className="popup-buttons">
              <button onClick={() => handlePopupAction("discard")}>Discard</button>
              <button onClick={() => handlePopupAction("save")}>Save</button>
            </div>
          </div>
        </div>
        )}


      </main>
    </div>
  );
};

export default PomodoroTimer;
