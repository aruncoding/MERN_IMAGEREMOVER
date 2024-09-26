import React, { useState } from 'react';
import './Imageuploader.css';
import { useSelector } from 'react-redux';

const ImageUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const { selectedFolderId, selectedSubFolderId } = useSelector((state) => state.component);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        if (selectedFiles) {
            const formData = new FormData();
            formData.append('folderId', selectedFolderId);
            formData.append('subFolderId', selectedSubFolderId);
    
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }
    
            try {
                const response = await fetch('http://localhost:8000/api/image/uploadimage', {
                    method: 'POST',
                    body: formData,
                });
    
                const result = await response.json();
                console.log(result.message);
            } catch (error) {
                console.error('Error uploading files:', error);
            }
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
