import React, { useState, useEffect } from 'react';
import './Sidemenu.css';
import { useDispatch, useSelector } from "react-redux";
import { getFolder } from '../../actions/clientAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addFolder } from '../../actions/folderAction';
import { Link } from 'react-router-dom';
import { showDashboard,showImageUploader,showImageViewer } from '../../actions/componentRenderAction';

const Sidemenu = ({ onShareClick }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [activeFolders, setActiveFolders] = useState({});
    const { clientmade } = useSelector((state) => state.client);
    const { folders,createfolder } = useSelector((state) => state.clientfolder);
    const { foldermade } = useSelector((state) => state.createfolder);

    useEffect(() => {
        if (clientmade || foldermade) {
            dispatch(getFolder());
            setActiveFolders({});
        }
    }, [clientmade, foldermade,dispatch]);
    console.log("foldermade",foldermade)
    const toggleMenu = () => setIsOpen(!isOpen);

    const handleExpandClick = (folderId) => {
        if (activeFolders[folderId]?.length > 0) return;

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

        const inputs = activeFolders[folderId].filter(input => input !== '');
        inputs.forEach(input => {
            dispatch(addFolder(folderId, input));
        });

        setActiveFolders(prev => ({
            ...prev,
            [folderId]: [] // Reset the input fields
        }));
        // dispatch(getFolder);
    };

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
                                        <button type="submit" style={{ border: '2px solid #000' }}>Submit</button>
                                    </React.Fragment>
                                ))}
                            </form>
                        )}

                        {/* Only render the subfolder part */}
                        {folder.subFolders && folder.subFolders.length > 0 && (
                            <ul className="sub-folder-list">
                                {folder.subFolders.map(subFolder => (
                                    <div className='sub-folder-value' key={subFolder.id}>
                                        <li className="sub-folder-item">
                                            <input
                                                type="text"
                                                className="folder-input"
                                                value={subFolder.FolderName}
                                                readOnly
                                            />
                                        </li>
                                        <div className='subfolder-button'>
                                            {/* <button >Add Client</button>
                                            <button onClick={onShareClick}>Upload Image</button> */}
                                            {/* <Link to='/addclientimage'>Add Client</Link>
                                            <Link to='/uploadimage' >Add Image</Link>
                                            <Link to='/showimage'>Show Image</Link> */}
                                            {/* <button>Show Image</button> */}
                                            <button onClick={() => dispatch(showDashboard())}>
                                                Add Client
                                            </button>
                                            <button onClick={() => dispatch(showImageUploader())}>
                                                Upload Image
                                            </button>
                                            <button onClick={() => dispatch(showImageViewer())}>
                                                Show Image
                                            </button>
                                        </div>
                                    </div>
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
