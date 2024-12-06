import React from 'react'

export default function SessionCard() {
  return (
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
  )
}
