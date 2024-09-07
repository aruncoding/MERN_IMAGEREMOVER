// src/components/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Email: '',
    Password: '',
  });

  const tableForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      // Make the API call
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form), // Send form data as JSON
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        console.log('User signed in successfully:', data);
        if (data.status === 'success') {
          navigate('/dashbaord'); // Navigate to services page after sign-in
        } else {
          alert('Sign-in failed');
        }
      } else {
        const errorData = await response.json();
        console.error('Error signing in:', errorData);
        // Optionally show error messages to the user here
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle any network errors here
    }
  };

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className="auth-container">
      {!showForgotPassword ? (
        <form className="auth-form" onSubmit={handleSignIn}>
          <h2>Sign In</h2>
          <label>
            Email:
            <input
              type="email"
              name="Email"
              value={form.email}
              onChange={tableForm}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="Password"
              value={form.password}
              onChange={tableForm}
              required
            />
          </label>
          <button type="submit">Sign In</button>
          <p className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?
          </p>
          <p className="signup-link">
            Don't have an account? <a href="/sign-up">Sign Up</a>
          </p>
        </form>
      ) : (
        <div className="forgot-password-container">
          <h2>Forgot Password</h2>
          <p>Please enter your email to reset your password.</p>
          <input type="email" placeholder="Email" required />
          <button>Send Reset Link</button>
          <p className="back-to-signin" onClick={() => setShowForgotPassword(false)}>
            Back to Sign In
          </p>
        </div>
      )}
    </div>
  );
};

export default SignIn;
