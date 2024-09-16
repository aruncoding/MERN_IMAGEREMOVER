import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Sidemenu from '../sidemenu/Sidemenu';
import Imageuploader from '../Imaguploader/Imageuploader';// Assuming ImageUploader is imported

const MergeDashboardSidemenu = () => {
    const [showImageUploader, setShowImageUploader] = useState(false);

    const handleShareClick = () => {
        setShowImageUploader(true); // Show ImageUploader when share is clicked
    };

    return (
        <div className="Merge-Dashboard-Sidemenu">
            {/* Conditionally render Dashboard or ImageUploader */}
            {showImageUploader ? <Imageuploader /> : <Dashboard />}
            {/* Pass the handleShareClick function as a prop */}
            <Sidemenu onShareClick={handleShareClick} />
        </div>
    );
};

export default MergeDashboardSidemenu;
