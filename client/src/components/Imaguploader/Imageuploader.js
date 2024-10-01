import React, { useState, useEffect } from 'react';
import './Imageuploader.css';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImage } from '../../actions/imageAction';
import { IMAGE_ADD_REQUEST } from '../../constants/imageConstants';
const ImageUploader = () => {
    const dispatch = useDispatch();
    const [selectedFiles, setSelectedFiles] = useState(null);
    const { selectedFolderId, selectedSubFolderId } = useSelector((state) => state.component);
    const { image, imageAdded } = useSelector((state) => state.image);
    console.log("image", image);
    console.log("imageAdded", imageAdded);
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

     // Hide the message after a few seconds when image is successfully added
     useEffect(() => {
        if (imageAdded) {
            const timer = setTimeout(() => {
                dispatch({ type: IMAGE_ADD_REQUEST }); 
            }, 3000);
            setSelectedFiles(null);
            return () => clearTimeout(timer);
        }
    }, [imageAdded, dispatch]);
    

    return (
        <div className="image-uploader">
            <h2 className="uploader-title">Upload Your Images</h2>

             {/* Conditionally show the success message based on imageAdded */}
             {imageAdded && (
                <div className="success-message">
                    Image uploaded successfully!
                </div>
            )}

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
