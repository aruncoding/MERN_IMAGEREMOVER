// src/components/SignOut.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignOut.css';

const SignOut = ({ onSignOut }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/'); // Navigate to home page after sign-out
  };

  return (
    <div className="sign-out-container">
      <button className="sign-out-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
