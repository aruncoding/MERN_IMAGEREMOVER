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
        console.log("reqreqreqss",req.user.dataValues.id)

        if(req.name && req.mobile){
            const userCreate = client.create({
                clientName: name,
                clientMobile: mobile,
                createdBy: req.user.dataValues.id
            });
            res.send({ "status": "success", "message": "Client Created Successfully!"})
        }else{
            res.send({ "status": "failed", "message": "All Fields Required!" })
        }

    }
}

export default ClientController