import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/settings.css';

import user2 from '../assets/images/user2.svg';

export default function Settings() {

  return (
    <div>
      <head>
        <title>Focus Timers | Settings</title>
      </head>
      <main>
        <section id="settings-section">
          <h2>User Settings</h2>
          <form id='settings-form'>
          <div className="config-item">
            <img src={user2} alt="Imagen de usuario" id="user-image2" />
          </div>
          <div className="config-item">
            <label htmlFor="name">Username</label>
            <input type="text" id="name" defaultValue="Mondongo23" />
          </div>
          <div className="config-item">
            <label htmlFor="email">Registred email</label>
            <input type="email" id="email" defaultValue="usuario@correo.com" />
          </div>
          <div className="config-item">
            <label htmlFor="password">Change password</label>
            <input type="email" id="email" placeholder='new password here' />
          </div>
          
          <button type="submit">Save changes</button>

          </form>
          <div id="login-redirect">
            <p>Want to log out?</p>
            <Link to={'/Login'} id="logout-link">Log Out</Link>
          </div>       
        </section>
        
      </main>
    </div>
  );
}
