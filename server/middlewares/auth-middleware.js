import  jwt  from "jsonwebtoken";
import db from "../models/index.js";
const user = db.user;

var checkUserAuth = async(req, res, next) => {
    let token;
    //Get Token From Header
    const {authorization} = req.headers
    if(authorization && authorization.startsWith('Bearer')){
        try{
            token = authorization.split(" ")[1]

            //Verify Token
            const {UserId} = jwt.verify(token, process.env.JWT_SECRET)

            //Get User From Token
            req.user = await user.findOne({ where: { id: UserId }, attributes: { exclude: ['password'] } });
            // console.log('UserId', UserId);
            // console.log('req.user', req.user);
            next()
        }catch(error){
            console.log(error)
            res.status(401).send({"status":"failed", "message": "Unauthorized User"})
        }
    }
    if(!token){
        res.status(401).send({"status":"failed", "message": "Unauthorized User, No Token"})
    }
}

export default checkUserAuth