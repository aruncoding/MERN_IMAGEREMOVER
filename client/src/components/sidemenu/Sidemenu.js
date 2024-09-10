// src/MenuBar.js
import React, { useState, useEffect } from 'react';
import './Sidemenu.css';
import { useDispatch, useSelector } from "react-redux";
import { getFolder } from '../../actions/clientAction';

const Sidemenu = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { clientmade } = useSelector(
        (state) => state.client
    );
    console.log("sideenu", clientmade)
    const { folders } = useSelector((state) => state.clientfolder);
    console.log("tttttttttffff", folders)
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (clientmade) {
            dispatch(getFolder());
        }

    }, [clientmade]);

    return (
        <div className={`menu-bar ${isOpen ? 'open' : ''}`}>
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <ul>
                {folders.map((folder) => (
                    <li key={folder.id} className="menu-item">
                        <span className="item-title">{folder.FolderName}</span>
                        <span className="item-expand">+</span>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default Sidemenu;
