import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs'
export const update = async(req, res, next) =>{

        console.log(req.params.id)
        console.log(req.user.id)

        if(req.params.id !== req.user.id){
            return next(errorHandler(401, 'you can only update your own account'))
        }
        try {
            // console.log('yeah')
            if(req.body.password){
                req.body.password = bcrypt.hashSync(req.body.password, 10)
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
            }, { new: true });

            const {password, ...rest} = updatedUser._doc
            res.status(200).json(rest)


        } catch (error) {
            next(error)
        }
    };

export const deleteUser = async(req, res, next)=>{
    try {
        if(req.params.id !== req.user.id){
            return next(errorHandler(401, 'you can only delete your own account'))
        }
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('user has been deleted')
        
    } catch (error) {
        next(errorHandler(400, error.message))
    }
}

export const getUserListings = async(req, res, next)=>{
    
    try {
        if(req.params.id !== req.user.id){
            return next(errorHandler(401, 'you can only show your own listings'))
        }
        const listing = await Listing.find({useRef: req.params.id})
        if(listing.length>0){
            res.status(200).json(listing);
        }else{
            next(errorHandler(201, "you don't have any listing"))
        }
        
    } catch (error) {
        next(errorHandler(400, error.message))
    }
}

export const getAuthor =async(req, res, next)=>{
    try {
        const author = await User.findById(req.params.id);
        if(!author){
            return res.status(404).json("user not found")
        }
        const {password, ...rest} = author._doc
        res.status(200).json(rest)
    } catch (error) {
        next(errorHandler(401, error.message))
    }
}