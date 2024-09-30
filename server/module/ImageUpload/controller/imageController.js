import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from '../../../models/index.js';
import path from 'path'; // Import path for file extension handling
const user = db.user;
const Image = db.image; // Import the Image model

class imageController {

    static uploadImages = async (req, res) => {
        try {
            const { folderId, subFolderId } = req.body;
            const files = req.files;

            const token = await req.cookies.token;
            if (!token) {
                return res.status(403).send({ message: "No token provided!" });
            }

            if (!files || files.length === 0) {
                return res.status(400).json({ message: 'No files uploaded.' });
            }
            console.log("dfdfdf",req)
            // Save all image information to the database
            const imageRecords = files.map(file => ({
                folderId,
                subFolderId,
                filePath: `uploads/${file.filename}`, // Store the file path
                fileType: path.extname(file.originalname), // Store the file extension/type
                createdBy: req.user.dataValues.id // Assuming you have user ID from JWT token
            }));

            await Image.bulkCreate(imageRecords);

            res.status(201).json({ status: 'success', data: imageRecords });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'Error uploading images.' });
        }
    }

}

export default imageController;
