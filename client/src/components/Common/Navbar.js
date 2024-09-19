// src/components/Navbar.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logout } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleSignOut = () => {
    dispatch(logout()); // Dispatch logout action
    navigate('/'); // Redirect to home after logout
  };
  console.log('isAuthenticatedlogout',isAuthenticated)

  useEffect(() => {
    if (error) {
      alert(error); // Handle any errors
      dispatch(clearErrors()); // Clear errors after showing them
    }
  }, [error, dispatch]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left-aligned menu */}
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/services">Services</Link></li>

          {/* Conditionally render the Dashboard link */}
          {isAuthenticated && (
            <li><Link to="/dashboard">Dashboard</Link></li>
          )}
        </ul>

        {/* Right-aligned signout or login button */}
        {isAuthenticated ? (
          <div className="navbar-signout">
            <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
          </div>
        ) : (
          <div className="navbar-signout">
            <Link to="/sign-in" className="login-button">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
