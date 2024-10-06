import React from 'react';
import Dashboard from './Dashboard';
import Sidemenu from '../sidemenu/Sidemenu';
import Imageuploader from '../Imaguploader/Imageuploader';
import { useSelector } from 'react-redux';
import './MergeDashboardSidemenu.css'; // Import the CSS here
import ShowImage from '../ShowImage/ShowImage';

const MergeDashboardSidemenu = () => {
    const currentComponent = useSelector((state) => state.component.currentComponent); // Access the component state

    const renderComponent = () => {
        switch (currentComponent) {
            case 'imageUploader':
                return <Imageuploader />;
            case 'showImage':
                return <ShowImage />;
            case 'dashboard':
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="Merge-Dashboard-Sidemenu">
            <Sidemenu />
            {renderComponent()}
        </div>
    );
};

export default MergeDashboardSidemenu;
