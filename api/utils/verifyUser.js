import { errorHandler } from "./error.js";
import  jwt  from "jsonwebtoken";
export const verifyToken = (req, res, next)=>{
    console.log('reached here!')
    const token = req.cookies.access_token;

    if(!token){
        return next(errorHandler(401, 'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return next(err)
        }console.log('token is matched')

        req.user = decoded;
        next();
    })

}
