// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors,logout } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleSignOut = () => {
    dispatch(logout()); // Dispatch signOut action to update isAuthenticated
    navigate('/');
  };

  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate('/'); // Navigate to the dashboard when authentication is successful
    // }

    if (error) {
      alert(error); // Handle any errors
      dispatch(clearErrors()); // Clear errors after showing them
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/services">Services</Link></li>
        {isAuthenticated ? (
          <li><Link onClick={handleSignOut}>Sign Out</Link></li>
        ) : (
          <li><Link to="/sign-in">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
