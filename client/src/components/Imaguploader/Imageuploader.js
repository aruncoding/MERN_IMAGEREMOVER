import React, { useState } from 'react';
import './Imageuploader.css';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImage } from '../../actions/imageAction';
const ImageUploader = () => {
    const dispatch = useDispatch();
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
            console.log("formdataaa",formData)
            try {
                dispatch(uploadImage(formData));
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
