import React, { useState } from 'react';
import '../styles/login.css';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // Import the login API call
import eye from '../assets/images/eye.svg';
import eyeblock from '../assets/images/eye-block.svg';
import Signin from './Signin';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const success = await loginUser(formData);
      if (success) {
        alert('Login successful!');
        navigate('/dashboard'); // Navigate to dashboard or another route
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.src = eyeblock; // Update to the "eye-off" icon if available
    } else {
      passwordInput.type = 'password';
      toggleIcon.src = eye; // Revert to the original "eye" icon
    }
  };

  return (
    <div>
      <head>
        <title>Focus Timers | Log in</title>
      </head>
      <main>
        <section id="login-section">
          <h2>Log In</h2>
          <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="yourname@example.com"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Enter a valid email address, like example@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="password">Password:</label>
            <div className="password-container">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
              <button type="button" id="togglePassword" onClick={togglePasswordVisibility}>
                <img src={eye} id="toggleIcon" alt="Show Password" />
              </button>
            </div>

            <button id="submit" type="submit">Log in</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div id="register-redirect">
            <p>Don't have an account?</p>
            <Link to="/Signin" id="signin-ref">Sign up</Link>
          </div>
        </section>
      </main>
      <Routes>
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </div>
  );
}
