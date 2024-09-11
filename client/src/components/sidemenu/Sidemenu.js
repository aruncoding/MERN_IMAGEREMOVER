import React, { useState, useEffect } from 'react';
import './Sidemenu.css';
import { useDispatch, useSelector } from "react-redux";
import { getFolder } from '../../actions/clientAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidemenu = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [activeFolders, setActiveFolders] = useState({});
    const [folderInputs, setFolderInputs] = useState({});
    const { clientmade } = useSelector((state) => state.client);
    const { folders } = useSelector((state) => state.clientfolder);

    useEffect(() => {
        if (clientmade) {
            dispatch(getFolder());
        }
    }, [clientmade, dispatch]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleExpandClick = (folderId) => {
        setActiveFolders(prev => ({
            ...prev,
            [folderId]: [...(prev[folderId] || []), '']
        }));
    };

    const handleInputChange = (folderId, index, value) => {
        setActiveFolders(prev => ({
            ...prev,
            [folderId]: prev[folderId].map((input, i) => i === index ? value : input)
        }));
    };

    const handleInputSubmit = (e, folderId) => {
        e.preventDefault();
        setFolderInputs(prev => ({
            ...prev,
            [folderId]: [...(prev[folderId] || []), ...activeFolders[folderId]]
        }));
        setActiveFolders(prev => ({
            ...prev,
            [folderId]: []
        }));
    };

    const handleDeleteValue = (folderId, index) => {
        setFolderInputs(prev => ({
            ...prev,
            [folderId]: prev[folderId].filter((_, i) => i !== index)
        }));
    };

    return (
        <div className={`menu-bar ${isOpen ? 'open' : ''}`}>
            <button className="menu-toggle" onClick={toggleMenu}>
                {/* <FontAwesomeIcon icon={faBars} aria-hidden="true" /> */}
                <span className='toggle-name'> Client Name</span>
            </button>
            <ul>
                {folders.map(folder => (
                    <li key={folder.id} className="menu-item">
                        <div className="item-header">
                            <input
                                type="text"
                                className="folder-input"
                                value={folder.FolderName}
                                readOnly
                            />
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="item-expand"
                                onClick={() => handleExpandClick(folder.id)}
                            />
                        </div>
                        {activeFolders[folder.id]?.length > 0 && (
                            <form onSubmit={e => handleInputSubmit(e, folder.id)}>
                                {activeFolders[folder.id].map((input, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="folder-input"
                                        placeholder="Enter text..."
                                        value={input}
                                        onChange={e => handleInputChange(folder.id, index, e.target.value)}
                                    />
                                ))}
                                <button type="submit" style={{
                                    border: '2px solid #000', // Apply the border style directly here
                                    // You can add more styles if needed
                                }}>Submit</button>
                            </form>
                        )}
                        {folderInputs[folder.id]?.length > 0 && (
                            <div className="folder-values">
                                {folderInputs[folder.id].map((value, index) => (
                                    <div key={index} className="folder-value">
                                        <input
                                            type="text"
                                            className="folder-input"
                                            value={value}
                                            readOnly
                                        />
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className="delete-icon"
                                            onClick={() => handleDeleteValue(folder.id, index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidemenu;
