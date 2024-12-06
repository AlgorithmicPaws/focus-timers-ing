import '../styles/sesions.css'
import React from 'react'

import '../components/session/SessionCard.jsx'
import SessionCard from '../components/session/SessionCard.jsx'

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
                <SessionCard />
                <SessionCard />
                <SessionCard />
            </div>  
        </div>
      </main>

    </div>
  )
}
