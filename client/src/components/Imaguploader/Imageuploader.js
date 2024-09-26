import React, { useState } from 'react';
import './Imageuploader.css';
import { useSelector } from 'react-redux';

const ImageUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const { selectedFolderId, selectedSubFolderId } = useSelector((state) => state.component);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = () => {
        if (selectedFiles) {
            console.log('Folder ID:', selectedFolderId);
            console.log('Subfolder ID:', selectedSubFolderId);
            console.log('Files to upload:', selectedFiles);

            // Here you would implement the actual image upload logic.
        } else {
            console.log('No files selected.');
        }
    };

    return (
        <div className="image-uploader">
            <h2 className="uploader-title">Upload Your Images</h2>
            <input
                type="file"
                accept="image/*"
                multiple
                className="file-input"
                onChange={handleFileChange}
            />
            <button className="upload-btn" onClick={handleUpload}>
                Upload
            </button>
        </div>
    );
};

export default ImageUploader;
