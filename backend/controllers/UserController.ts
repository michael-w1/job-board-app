import { Request, Response } from 'express';
import User from '../models/user.model';


const getCurrentUser = async (req: Request, res: Response) =>{

    try {
        const currentUser = await User.findOne({ _id: req.userId });
        if (!currentUser) return res.status(404).json({ message: "User not found" });
        // console.log("current", currentUser); 
        res.json(currentUser.toObject());
    } catch (error) {
        return res.status(500).json({ message: "Error in getting user" });
    }

};

const createCurrentUser = async (req: Request, res: Response) =>{
    try{
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({auth0Id});
        if (existingUser) return res.status(200).send(); 

        const newUser = new User(req.body);
        await newUser.save(); 
        // console.log("new user here", newUser); 
        // Convert document object from Mongoose back to JS object 
        res.status(201).json(newUser.toObject()); 
    }catch(error){
        res.status(500).json({message: "Error in creating new user"}); 
    }
}

export default {
    createCurrentUser,
    getCurrentUser
}
