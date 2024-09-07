// src/MenuBar.js
import React, { useState } from 'react';
import './Sidemenu.css'; // Import the CSS file for styling

const Sidemenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`menu-bar ${isOpen ? 'open' : ''}`}>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    );
};

export default Sidemenu;
