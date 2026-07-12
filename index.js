import express from "express";
import dotenv from 'dotenv';
import fs from 'fs';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import movieRoutes from "./routes/route.movie.js";
import theatreRoutes from "./routes/route.theatre.js";
import authRoutes from './routes/route.auth.js';
import userRoutes from "./routes/route.user.js";
import bookingRoutes from "./routes/route.booking.js";
import showRoutes from "./routes/route.show.js";
dotenv.config();

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port=process.env.PORT;

const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGOURL);
        console.log("Succesfully Connected to MongoDB")
    }catch(error){
        console.log("Error Connected to MongoDB : ",error.name);
    }
}

dbConnect();

movieRoutes(app);
theatreRoutes(app);
authRoutes(app);
userRoutes(app);
bookingRoutes(app);
showRoutes(app);

app.listen(port,()=>{
    console.log(fs.readFileSync('./banner.txt','utf-8'));
});
