import multer from 'multer';
import path from 'path';

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where the files will be stored
    },
    filename: (req, file, cb) => {
        // Generate a unique name for the file
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only image files are allowed!'), false); // Reject file
    }
};

// Create multer instance with defined configurations
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    // limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit to 5MB
});

export const uploadMultiple = upload.array('images', 1000);