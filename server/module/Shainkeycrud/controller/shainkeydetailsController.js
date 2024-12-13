import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import db from '../../../models/index.js';
import { where } from 'sequelize';
const shainkeydetail = db.shainkeydetail


class shainkeydetailController {

    static createShainkeydetails = async (req, resp)=>{
        const { Name, Mobile,Designation,createdBy } = req.body;
      console.log(req.body,"createShainkeydetails");
      
       const createdetails = await shainkeydetail.create({
        Name : Name,
        Mobile : Mobile,
        Designation : Designation,
        createdBy : createdBy
       })

       try {

        resp.send({
            Status : 200,
            Message : "Shainkey Details Creat Successfuly !",
            Data : createdetails
        })

       } catch (e) {

        res.send({ 
        status: 404, 
        message: "Folder Creation Failed",
        error : e.message

        })
        
       }

       }
    
    static getshainkeydetails = async (req, res) =>{
      try {
        const getshainkeydetails = await shainkeydetail.findAll({Where:  { isDeleted : false }})
        return res.status(200).json({
            code: 200,
            message: "Folder Details",
            data: getshainkeydetails
        });
      } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "An error occurred",
            error: e.message
        });
      }
    }

    static updateshainkeydetails = async (req, res) =>{
       try {
        console.log(req,"updateshainkeydetails");
        
          const getUser = await shainkeydetail.findOne({ where: { id: req.shainkeydetail.dataValues.id, isDeleted: false } });
          

       } catch (e) {
        
       }
    }

    static deleteshainkeydetails = async (req, res) =>{
        
    }

}

export default shainkeydetailController
