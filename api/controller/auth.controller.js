import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signUp = async(req, res, next) =>{
    console.log(req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.json("pls enter valid details")
    }
    //errorHandling is good for custom error
    // if(password.length < 5){
    //     next(errorHandler(401, 'the length of password must be more then 8 characters'))
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json("user created")

    }
    catch(error){
        // next(errorHandler(500, error.message));
        next(error);


    }
    
}