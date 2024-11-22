import React, { useState } from 'react';
import '../styles/signin.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { createUser } from '../api'; // Import the API utility function
import Login from './Login';

export default function Signin() {
  const [formData, setFormData] = useState({
    name: '',
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
    setError(''); // Clear previous error messages

    try {
      await createUser(formData);
      alert('User created successfully!');
      navigate('/dashboard'); // Navigate to dashboard or another route
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <head>
        <title>Focus Timers | Sign in</title>
      </head>
      <main>
        <section id="register-section">
          <h2>Sign In</h2>
          <form id="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="yourname@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="4 - 12 characters"
              value={formData.password}
              onChange={handleInputChange}
            />

            <button type="submit">Create</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div id="login-redirect">
            <p>Already have an account?</p>
            <Link to={'/Login'} id="login-ref">Log in</Link>
          </div>
        </section>
      </main>
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}
