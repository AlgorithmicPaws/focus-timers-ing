import React from 'react'
import './pomodoro.css';
import coffe from './images/coffe.svg';
import work from './images/work.svg';
import couch from './images/couch.svg';
import tomato from './images/tomato.svg';

export default function Pomodoro() {
  return (
    <div>
        <head>
            <title>Focus Timers | Pomodoro</title>
        </head>
        <main class="pomodoro-timer">
        <div class="time-container">
            <h3>Focus Time</h3>
            <p class="time">20:00</p>
        </div>
        <div class="timer-settings">
            <div class="timer-parameters">
                <div class="form-group">
                    <img id="focus-icon"src={work} alt="Focus time" />
                    <label id="focus-lable" for="focus">Focus</label>
                    <input type="number" id="focus" class="time-setter"  min="1" value="20" /> 
                    <label for="focus">min</label>
                </div>
                <div class="form-group">
                    <img id="coffe-icon" src={coffe} alt="Break time" />
                    <label id="break-lable" for="break">Break</label>
                    <input type="number" id="break" class="time-setter"  min="1" value="5" />
                    <label for="break">min</label>
                </div>
                <div class="form-group">
                    <img id="couch-icon" src={couch} alt="Long break time" />
                    <label id="longbreak-lable" for="longbreak">Long <br /> Break</label>
                    <input type="number" id="longbreak" class="time-setter"  min="1" value="30" />
                    <label for="longbreak">min</label>
                </div>
                <div class="form-group">
                    <img id="tomato-icon" src={tomato} alt="Amount of pomodoros" />
                    <label>&nbsp;Amt.</label>
                    <input type="number" id="amount" class="time-setter"  min="1" value="1" />
                    <label for="amount">&nbsp; &nbsp; &nbsp; &nbsp;</label>
                </div>
            </div>
            <div class="timer-buttons">
                <button>Start</button>
                <button>Reset</button>
            </div>
        </div>
    
    </main>
    </div>
  )
}
