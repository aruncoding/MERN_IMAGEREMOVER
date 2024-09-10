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
                <li class="menu-item">
                    <span class="item-title">25 Tested By Replace Issue</span>
                    <span class="item-expand">+</span>
                </li>
                <li class="menu-item">
                    <span class="item-title">26 Tested By Replace and dwnload</span>
                    <span class="item-expand">+</span>
                </li>
                <li class="menu-item">
                    <span class="item-title">27 5 mb file</span>
                    <span class="item-expand">+</span>
                </li>
                <li class="menu-item">
                    <span class="item-title">28 10 mb file</span>
                    <span class="item-expand">+</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidemenu;
