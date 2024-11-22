import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';

import pomodoro from '../assets/images/pomodoro.svg'

import Pomodoro from './Pomodoro';
import About from './About';

import '../styles/home.css';

export default function Main() {
  return (  
    <div>
        <head>
            <title>Focus Timers</title>
        </head>
        <main id="page-welcome">
            <h2>Online timers to focus on your work</h2>
            <p>Multiple timers based on time management and focus studies</p>
        <section id="timer-options">
            <div id="card">
                <Link to={'/pomodoro'}>
                    <img src={pomodoro} alt="Timer" />
                    <h3>Pomodoro</h3>
                </Link>
                <p id="card-description">
                Boost your productivity by breaking work into intervals, called "pomodoros".
                Between each pomodoro, a short break is taken. After four
                pomodoros, a longer break is taken. </p>
                <Link id="learn-more" to={'/about'}>+ Learn more</Link>
            </div>
        </section>
        </main>
        <Routes>
            <Route path='/pomodoro' element={<Pomodoro />}/>
            <Route path='/about' element={<About />}/>
        </Routes>
    </div>
  )
}
