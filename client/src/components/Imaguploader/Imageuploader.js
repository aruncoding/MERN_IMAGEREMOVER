import React, { useState } from 'react';
import './Imageuploader.css'; // Make sure to import the CSS

const Imageuploader = () => {
    return (
        <div className="image-uploader">
            <input
                type="file"
                accept="image/*"
                multiple
                className="file-input"
            />
            <button className="upload-btn">Upload</button>
        </div>
    );
};

export default Imageuploader;
