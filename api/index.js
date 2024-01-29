import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRouter from "./route/user.route.js";
import authRouter from "./route/auth.route.js";

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
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)




app.listen(3001, ()=>{
    console.log("the server is running on port 3001");
})
