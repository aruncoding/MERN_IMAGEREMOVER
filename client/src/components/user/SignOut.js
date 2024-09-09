// src/components/SignOut.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignOut.css';
import { useDispatch, useSelector } from "react-redux";


const SignOut = ({ onSignOut }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleSignOut = () => {
    dispatch(onSignOut());
    navigate('/'); // Navigate to home page after sign-out
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Navigate to the dashboard when authentication is successful
    }

    if (error) {
      alert(error); // Handle any errors
      dispatch(clearErrors()); // Clear errors after showing them
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  return (
    <div className="sign-out-container">
      {/* <button className="sign-out-button" onClick={handleSignOut}>
        Sign Out
      </button> */}
    </div>
  );
};

export default SignOut;
