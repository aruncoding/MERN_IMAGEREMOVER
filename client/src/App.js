// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignOut = () => setIsAuthenticated(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/sign-in" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashbaord" element={<Dashboard />} />
        {/* <Route path="/sign-out" element={<SignOut onSignOut={handleSignOut} />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
