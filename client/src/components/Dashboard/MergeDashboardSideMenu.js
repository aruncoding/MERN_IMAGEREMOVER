import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Sidemenu from '../sidemenu/Sidemenu';
import Imageuploader from '../Imaguploader/Imageuploader';// Assuming ImageUploader is imported
import { useSelector } from 'react-redux';
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
            {renderComponent()}
            <Sidemenu />
        </div>
    );
};

export default MergeDashboardSidemenu;
