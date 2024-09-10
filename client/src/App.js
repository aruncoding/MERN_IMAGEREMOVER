// src/App.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Home from './components/home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Conatct';
import Services from './components/Services/Services';
import SignIn from './components/user/SignIn';
import SignUp from './components/user/SignUp';
import SignOut from './components/user/SignOut';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

const App = () => {

  const { error, isAuthenticated } = useSelector(
    (state) => state.user
  );


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        {/* <Route path="/sign-out" element={<SignOut onSignOut={handleSignOut} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
