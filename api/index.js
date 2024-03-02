import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRouter from "./route/auth.route.js";
import userRouter from "./route/user.route.js";
import listingRouter from "./route/listing.route.js";


import  cors  from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("MongoDb is connected");
})
.catch((err)=>{
    console.log(err);
})

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
// app.use(cors())

app.listen(3001, ()=>{
    console.log("the server is running on port 3001");
})


app.use('/api/auth', authRouter)//if any error occur in this theh the next there will take that to next middleware that is to handle error
app.use('/api/user', userRouter)
app.use('/api/listing', listingRouter)



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Already signed up'
    res.status(statusCode).json({
        'success': false,
        'statusCode': statusCode,
        'message': message
    })

})

