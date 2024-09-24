// src/components/SignIn.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import { showDashboard } from '../../actions/componentRenderAction';

const SignIn = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
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
      const value = dispatch(login(form.Email, form.Password));
      console.log('login', value);

    } catch (error) {
      console.error('Network error:', error);
      // Handle any network errors here
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Navigate to the dashboard when authentication is successful
      dispatch(showDashboard())
    }

    if (error) {
      alert(error); // Handle any errors
      dispatch(clearErrors()); // Clear errors after showing them
    }
  }, [isAuthenticated, error, navigate, dispatch]);

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
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
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
