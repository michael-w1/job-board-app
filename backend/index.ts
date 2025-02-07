import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


import User from "./models/user.model";
import Job from "./models/job.model";
import userRoute from "./routes/UserRoute"; 
import jobRoute from "./routes/JobRoute"; 
// mongoose.connect(config.connectionString);

const mongoURI = process.env.MONGO_URI; 
if (!mongoURI) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
}

mongoose.connect(mongoURI);

const admin_id = process.env.ADMIN_ID;
if (!admin_id) {
    throw new Error('MONGO_URI is not defined in the environment variables.');
}
const app: Express = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);


app.get("/", (req: Request, res: Response) => {
    res.json({ data: "Hello World is it working" });
});


app.use("/api/my/user", userRoute);
app.use("/api/job", jobRoute); 

if (!process.env.ACCESS_TOKEN_SECRET) {
    console.log("JWT Secret Token is not setup in .env");
    process.exit(0);
}



app.listen(8000);
module.exports = app; 
