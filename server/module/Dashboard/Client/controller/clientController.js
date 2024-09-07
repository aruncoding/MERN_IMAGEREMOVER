import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from '../../../../models/index.js';
const user = db.user;
const client = db.client;
const folder = db.folder;

class ClientController {
    static createClient = async (req, res) => {
        const { name, mobile } = req.body;
        console.log(req.body,'createClient body');
        

        
        // if (userFind) {
        //     res.send({ "status": "failed", "message": "Email already exists" })
        // }
        // else {
        //     //below is checking wheather all fields have value or not
        //     if (Name && Email && password && cPassword) {
        //         if (password == cPassword) {
        //             try {
        //                 //Hasing password
        //                 const salt = await bcrypt.genSalt(10)
        //                 const hashPassword = await bcrypt.hash(password, salt)
        //                 const userCreate = user.create({
        //                     userName: Name,
        //                     userEmail: Email,
        //                     userPassword: hashPassword,
        //                 }).then(function (newUser) {
        //                     const savedUser = user.findOne({ userEmail: newUser.Email });
        //                     //Generate JWT Token
        //                     const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '5d' })
        //                     res.send({ "status": "success", "message": "Registration successfull!", "token": token, "userDetails": newUser })
        //                 });
        //             } catch (error) {
        //                 console.log(error)
        //                 res.send({ "status": "failed", "message": "Unable to Register" })
        //             }
        //         } else {
        //             res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
        //         }
        //     } else {
        //         res.send({ "status": "failed", "message": "All Fields Are Required" })
        //     }
        // }
    }
}

export default ClientController