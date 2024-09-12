import React, { useState, useEffect } from 'react';
import './Sidemenu.css';
import { useDispatch, useSelector } from "react-redux";
import { getFolder } from '../../actions/clientAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { addFolder } from '../../actions/folderAction';

const Sidemenu = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [activeFolders, setActiveFolders] = useState({});
    const [folderInputs, setFolderInputs] = useState([]); // Store input with folder ID
    const { clientmade } = useSelector((state) => state.client);
    const { folders } = useSelector((state) => state.clientfolder);
    // const { foldermade } = useSelector((state) => {state.createfolder})

    useEffect(() => {
        if (clientmade) {
            dispatch(getFolder());
        }
    }, [clientmade, dispatch]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleExpandClick = (folderId) => {
        // Prevent adding another input if there is already an active input for the folder
        if (activeFolders[folderId]?.length > 0) return;

        setActiveFolders(prev => ({
            ...prev,
            [folderId]: [...(prev[folderId] || []), ''] // Add new input
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

        // Get all non-empty inputs for the folder
        const inputs = activeFolders[folderId].filter(input => input !== '');

        // Loop through each input and dispatch the addFolder action
        inputs.forEach(input => {
            dispatch(addFolder(folderId, input)); // Dispatch folderId as fparentId and input as name
        });

        // Clear the active inputs for the folder after submission
        setActiveFolders(prev => ({
            ...prev,
            [folderId]: []
        }));

        // Optionally store submitted inputs in folderInputs if you need to display them
        setFolderInputs(prev => [
            ...prev,
            ...inputs.map(input => ({ folderId, input }))
        ]);
    };

    const handleDeleteValue = (folderId, index) => {
        // Remove the selected value from folderInputs
        setFolderInputs(prev =>
            prev.filter((item, i) => !(item.folderId === folderId && i === index))
        );
    };

    console.log("folderInputsfolderInputs", folderInputs);

    return (
        <div className={`menu-bar ${isOpen ? 'open' : ''}`}>
            <button className="menu-toggle" onClick={toggleMenu}>
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

                        {/* Display active input fields when expanded */}
                        {activeFolders[folder.id]?.length > 0 && (
                            <form onSubmit={e => handleInputSubmit(e, folder.id)}>
                                {activeFolders[folder.id].map((input, index) => (
                                    <React.Fragment key={index}>
                                        <input
                                            type="text"
                                            className="folder-input"
                                            placeholder="Enter text..."
                                            value={input}
                                            onChange={e => handleInputChange(folder.id, index, e.target.value)}
                                        />
                                        <button type="submit" style={{
                                            border: '2px solid #000',
                                        }}>Submit</button>
                                    </React.Fragment>
                                ))}
                            </form>
                        )}

                        {/* Display submitted inputs after submission */}
                        {folderInputs.filter(item => item.folderId === folder.id).length > 0 && (
                            <div className="folder-values">
                                {folderInputs.filter(item => item.folderId === folder.id).map((value, index) => (
                                    <div key={index} className="folder-value">
                                        <input
                                            type="text"
                                            className="folder-input"
                                            value={value.input}
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

                        {/* Display subFolders if present */}
                        {folder.subFolders && folder.subFolders.length > 0 && (
                            <ul className="sub-folder-list">
                                {folder.subFolders.map(subFolder => (
                                    <li key={subFolder.id} className="sub-folder-item">
                                        <input
                                            type="text"
                                            className="folder-input"
                                            value={subFolder.FolderName}
                                            readOnly
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidemenu;
