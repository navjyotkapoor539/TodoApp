import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoute from "../Backend/routes/todo.route.js";
import userRoute from "../Backend/routes/user.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

dotenv.config();

const PORT=process.env.PORT;
const DB_URI=process.env.MONGODB_URI

app.use(cors({
    origin:process.env.FRONTEND_URI,
    credentials:true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders:["Content-Type","Authorization"]
}))

try {
    await mongoose.connect(DB_URI)
    console.log("Connected to Mongodb")
} catch (error) {
    console.log(error)    
}

app.use(express.json());
app.use(cookieParser());
app.use("/todo",todoRoute);
app.use("/user",userRoute);
app.listen(PORT,()=>{
    console.log("Server is listening")
})
