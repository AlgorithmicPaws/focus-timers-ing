import React from 'react'
import './login.css';
import { Route, Routes, Link } from 'react-router-dom';

import eye from './images/eye.svg'
import Signin from './Signin';

export default function Login() {
  return (
    <div>
        <head>
            <title>Focus Timers | Log in</title>
        </head>
        <main>
          <section id="login-section">
              <h2>Login In</h2>
              <form id="login-form" action="dashboard.html" method="POST">
                  <label for="email">Email:</label>
                  <input type="email" id="email" name="email" placeholder="yourname@example.com" required 
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
                      title="Ingresa una dirección de correo válida, como example@gmail.com" />
              
                  <label for="password">Password:</label>
                  <div class="password-container">
                      <input type="password" id="password" name="password" placeholder="Password" required />
                      <button type="button" id="togglePassword">
                        <img src={eye} id="toggleIcon" alt="Show Password"/>
                      </button>
                  </div>
                  
                  
                  <button id="submit" type="submit">Log in</button>
              </form>
              
              <div id="register-redirect">
                <p>Already have an account?</p>
                <Link to={'/Signin'} id='signin-ref'>Log in</Link>
            </div>
          </section>
        </main>
        <Routes>
            <Route path='/Signin' element={<Signin />}/>
        </Routes>
    </div>
  )
}
