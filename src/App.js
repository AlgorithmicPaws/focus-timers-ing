import { Route, Routes, Link } from 'react-router-dom';
import './App.css';

//imagenes
import logo from './images/logo.svg'

//rutas
import React from 'react'
import Login from './Login';
import Main from './Main';
import Pomodoro from './Pomodoro';
import Signin from './Signin';
import Sesions from './Sesions';
import About from './About';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="page-logotype">
              <Link to={'/'}>
                  <img src={logo} alt="Focus Timers Logo"/>
                  <h1>FOCUS TIMERS</h1>
              </Link>
          </div>
          <div class="navegation-container">
              <nav>
                  <ul>
                      <li><Link to={'/Pomodoro'}>Pomodoro</Link></li>
                      <li><Link to={'/Login'}>Log In</Link></li>
                      <li><Link to={'/Signin'}>Sign In</Link></li>
                      <li><Link to={'/Sesions'}>Sesions</Link></li>
                      <li><Link to={'/About'}>About</Link></li>
                  </ul>
              </nav>
              <a href="https://www.buymeacoffee.com/algorithmicpaws"><button class="donation-button"></button></a>
          </div>

      </header>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Pomodoro' element={<Pomodoro />}/>
        <Route path='/Signin' element={<Signin />}/>
        <Route path='/Sesions' element={<Sesions />}/>
        <Route path='/About' element={<About />}/>
      </Routes>
    </div>
  );
}

export default App;
