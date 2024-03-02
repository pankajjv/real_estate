import User from "../models/user.model.js"
import { configDotenv } from "dotenv";
import bcrypt from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
configDotenv();
export const signUp = async (req, res, next) => {
    const { email } = req.body

    try {
        const hasedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email,
            password: hasedPassword
        })
        await user.save();
        console.log(user)
        res.status(201).json('user created')
    } catch (error) {
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const validUser = await User.findOne({ email: req.body.email });
        console.log(validUser)
        if (!validUser) {
            return next(errorHandler(401, 'user not found'))
        }
        const validPassword = await bcrypt.compare(req.body.password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(403, 'wrong credentials'));
        }
        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET
        )
        const { password: pass, ...rest } = validUser._doc

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',

        }).json(rest)
        .status(200)
        
    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    const validUser = await User.findOne({ email: req.body.email });
    if (validUser) {
        try {
            console.log('inside signin')
            const token = jwt.sign(
                { id: validUser._id },
                process.env.JWT_SECRET
            )
            const { password, ...rest } = validUser._doc
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            }).json(rest)
            .status(200)
        }
        catch (error) {
            next(error)
        }
    }
    else {
        try {
            const password = Math.random().toString(36) + Math.random().toString(36);
            const hashPassword = await bcrypt.hash(password, 10);
            console.log(hashPassword)
            console.log('inside signup')

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
                avatar: req.body.photo
            })
            await user.save();
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET
            )
            const { password: pass, ...rest } = user._doc
            res.cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(rest)
        } catch (error) {
            next(error)
        }
    }
}

export const signOut = async(req, res, next)=>{
    try {
        res.clearCookie('access_token')
        res.status(200).json('signed out!');
    } catch (error) {
        next(error)
    }
}



