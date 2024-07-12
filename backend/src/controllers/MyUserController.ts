import { Request , Response} from "express";
import User from "../models/user"
const createCurrentUser = async (req : Request , res: Response)=>{
    try{
        
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id })
        if(existingUser){
            return res.status(200).send()

        }
        console.log("here")
        const newUser = await new User( req.body )
        newUser.save();
        res.status(201).json(newUser.toObject());
    }catch(err){
        console.log(err)
        res.status(500).json({message:"ERROR CREATING USER"})
    }
}

export default {
    createCurrentUser

}
