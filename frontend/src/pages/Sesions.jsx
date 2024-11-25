import '../styles/sesions.css'
import React from 'react'

export default function Sesions() {
  return (
    <div>
      <head>
        <title>Focus Timers | Sessions</title>
      </head>
      <main>
      <div class="history-container">
            <div class="history-header">
                <h2>Sessions Histoy</h2>
                <p>Check your sessions history in different periods of time</p>
            </div>
            <div class="history-filters">
                <div class="filter-group">
                    <label for="date-filter">Time:</label>
                    <select id="date-filter">
                        <option value="week">All</option>
                        <option value="week">Last week</option>
                        <option value="month">Last month</option>
                        <option value="year">Last year</option>
                    </select>
                </div>
                <button class="export-button">Export</button>
            </div>
            <div class="session-grid">
                <div class="session-card">
                    <div class="session-date">12 Nov 2024 - 15:30</div>
                    <h3>Study session</h3>
                    <div class="session-stats">
                        <div class="stat-item">
                            <span>Duración Total:</span>
                            <span>2h 30m</span>
                        </div>
                        <div class="stat-item">
                            <span>Pomodoros Completados:</span>
                            <span>5</span>
                        </div>
                        <div class="stat-item">
                            <span>Pausas Cortas:</span>
                            <span>4</span>
                        </div>
                        <div class="stat-item">
                            <span>Pausas Largas:</span>
                            <span>1</span>
                        </div>
                    </div>
                </div>
                <div class="session-card">
                    <div class="session-date">12 Nov 2024 - 15:30</div>
                    <h3>Study session</h3>
                    <div class="session-stats">
                        <div class="stat-item">
                            <span>Duración Total:</span>
                            <span>2h 30m</span>
                        </div>
                        <div class="stat-item">
                            <span>Pomodoros Completados:</span>
                            <span>5</span>
                        </div>
                        <div class="stat-item">
                            <span>Pausas realizadas:</span>
                            <span>5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

    </div>
  )
}
