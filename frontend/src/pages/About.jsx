import '../styles/about.css'
import React from 'react'
import { Clock, Target, Activity, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="about-page">
      <head>
        <title>Focus Timers | About</title>
      </head>
      <main className="about-main">
        <div className="about-container">
          <div className="about-header">
            <h2>Focus Timers</h2>
            <p>Transform Your Productivity</p>
          </div>
          
          <div className="about-content">
            <section className="about-card">
              <div className="card-header">
                <Clock className="card-icon" />
                <h3>Pomodoro Technique</h3>
              </div>
              <p>
                A revolutionary time management method that breaks work into focused 25-minute intervals, 
                helping you maintain peak concentration and avoid burnout.
              </p>
            </section>

            <section className="about-card">
              <div className="card-header">
                <Target className="card-icon" />
                <h3>How It Works</h3>
              </div>
              <ul className="about-steps">
                <li><span>1</span> Choose your task</li>
                <li><span>2</span> Set a 25-minute timer</li>
                <li><span>3</span> Focus without interruptions</li>
                <li><span>4</span> Take a short break</li>
                <li><span>5</span> Repeat and track progress</li>
              </ul>
            </section>

            <section className="about-card">
              <div className="card-header">
                <Activity className="card-icon" />
                <h3>Productivity Benefits</h3>
              </div>
              <ul className="about-benefits">
                <li>Maximize focus and concentration</li>
                <li>Minimize burnout and mental fatigue</li>
                <li>Develop consistent work habits</li>
                <li>Track and improve your productivity</li>
              </ul>
            </section>

            <section className="about-card">
              <div className="card-header">
                <Award className="card-icon" />
                <h3>Our Mission</h3>
              </div>
              <p>
                Focus Timers empowers you to take control of your time, 
                boost productivity, and achieve your goals with a simple, 
                effective time management approach.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}