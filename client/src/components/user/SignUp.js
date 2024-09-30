// src/components/SignUp.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userAction';
import { useDispatch, useSelector } from "react-redux";
import { showDashboard } from '../../actions/componentRenderAction';
const SignUp = () => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Email: '',
    password: '',
    cPassword: '',
    Name: ''
  });

  const tableFoem = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const value = dispatch(register(form));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Navigate to the dashboard when authentication is successful
      dispatch(showDashboard())
    }
  }, [isAuthenticated]);
  

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={form.name}
            onChange={tableFoem}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={form.email}
            onChange={tableFoem}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={tableFoem}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="cPassword"
            value={form.cPassword}
            onChange={tableFoem}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        <p className="signin-link">
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
