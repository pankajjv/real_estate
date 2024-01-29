import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async(req, res) =>{
    console.log(req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.json("pls enter valid details")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json("user created")

    }
    catch(error){
        res.json(error.message)
    }
    
}