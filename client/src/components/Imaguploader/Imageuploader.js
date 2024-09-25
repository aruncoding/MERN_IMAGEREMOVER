import React, { useState } from 'react';
import './Imageuploader.css';

const ImageUploader = () => {
    return (
        <div className="image-uploader">
            <h2 className="uploader-title">Upload Your Images</h2>
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

export default ImageUploader;
