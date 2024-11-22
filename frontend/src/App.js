import { Route, Routes } from 'react-router-dom';
import './styles/app.css';


//rutas
import React from 'react'
import Login from './pages/Login';
import Home from './pages/Home';
import Pomodoro from './pages/Pomodoro';
import Signin from './pages/Signin';
import Sesions from './pages/Sesions';
import About from './pages/About';
import Header from './components/header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/pomodoro' element={<Pomodoro />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/sesions' element={<Sesions />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </div>
  );
}

export default App;
