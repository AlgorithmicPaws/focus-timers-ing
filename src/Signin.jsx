import React from 'react'
import './signin.css';
import { Link, Route, Routes } from 'react-router-dom';

import Login from './Login';

export default function Signin() {
  return (
    <div>
        <head>
            <title>Focus Timers | Sign in</title>
        </head>
        <main>
        <section id="register-section">
            <h2>Sign In</h2>
            <form id="register-form" action="dashboard.html" method="post">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required placeholder="Your name" />

                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="yourname@example.com" />

                <label for="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="4 - 12 characters" />

                <button type="submit">Create</button>
            </form>
            <div id="login-redirect">
                <p>Already have an account?</p>
                <Link to={'/Login'} id='login-ref'>Log in</Link>
            </div>
            
        </section>
    </main>
    <Routes>
        <Route path='/Login' element={<Login />}/>
    </Routes>
    </div>
  )
}
