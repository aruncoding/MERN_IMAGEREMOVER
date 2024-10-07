import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from '../../../models/index.js';
import path, { dirname, join } from 'path'; // Import path for file extension handling
import { constants } from 'buffer';
const user = db.user;
const Image = db.image; // Import the Image model
import { fileURLToPath } from 'url';

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
            // console.log("dfdfdf", req)
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

    static getImages = async (req, res) => {
        const { folderId, subFolderId } = req.query;

        try {
            // Validate if folderId and subFolderId are provided
            if (!folderId || !subFolderId) {
                return res.status(400).json({ message: "folderId and subFolderId are required!" });
            }

            const token = req.cookies.token;
            if (!token) {
                return res.status(403).send({ message: "No token provided!" });
            }

            const userId = req.user.dataValues.id;
            console.log("created by", userId);

            const images = await Image.findAll({
                where: {
                    folderId: folderId || null,
                    createdBy: userId || null,
                    isDeleted: false,
                    subFolderId: subFolderId || null
                }
            });

            if (images.length > 0) {
                // Map each image filePath to ensure it has single forward slashes for URL
                const imageUrls = images.map(image => ({
                    ...image.dataValues,
                    filePath: `${image.filePath}` // Ensure URL uses forward slashes
                }));

                return res.status(200).json({
                    status: 'success',
                    images: imageUrls
                });
            } else {
                return res.status(404).json({
                    status: 'fail',
                    message: 'No images found with the given criteria.'
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 'Error uploading images.' });
        }
    };



}

export default imageController;
