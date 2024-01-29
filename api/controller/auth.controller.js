import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt  from "jsonwebtoken";

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

export const signIn =async(req, res, next)=>{
    console.log(req.body);
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
          return  next(errorHandler(404, 'User not found'))
        }
        const validPassword = await bcrypt.compare(password, validUser.password);
        if(!validPassword){
            return networkInterfaces(errorHandler(401, 'Wrong credentials'))
        }
    
        const token = jwt.sign(
            {id: validUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '30s'}
            );
        const {password:pass, ...rest} = validUser._doc
        res.cookie('access_token', token, {httpOnly: true, maxAge: 24 * 60 *60 * 1000})
            .json(rest)
            .status(200)
        
    } catch (error) {
        next(error)    
    }
}