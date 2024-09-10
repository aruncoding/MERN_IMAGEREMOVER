// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router-dom';

const SignUp = () => {
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
  
    try {
      // Make the API call
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form), // Send form data as JSON
      });
  
      // Handle the response
      if (response.ok) {
        const data = await response.json();
        console.log('User signed up successfully:', data);
        if(data.status == 'success'){
          navigate('/dashboard'); // Redirect to sign-in page after successful sign-up
        }else{
          alert('Signup Failled');
        }
        
      } else {
        const errorData = await response.json();
        console.error('Error signing up:', errorData);
        // Optionally show error messages to the user here
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle any network errors here
    }
  };
  

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
