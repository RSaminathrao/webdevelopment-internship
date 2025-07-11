// Home.js
import React, { useState } from 'react';
import './external.css';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email or phone.');
    } else {
      setError('');
      navigate('/login', { state: { email: email.trim() } }); // pass email as state
    }
  };

  return (
    <div className="container">
      <form>
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google Logo"
        />
        <h1>Sign in</h1>
        <p>to continue to Google</p>
        <input
          type="email"
          placeholder="Email or phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <p>Not your computer? Use Guest mode to sign in privately.</p>
        <div className="actions">
          <Link id="nav-link" to="/name">Create account</Link>
          <button onClick={handleNext}>Next</button>
        </div>
      </form>
    </div>
  );
}

export default Home;
