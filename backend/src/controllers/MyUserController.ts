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

const updateCurrentUser = async (req : Request , res: Response)=>{
    try{
        const { name ,adrresLine1 ,city , country } = req.body;
        
        const newUser = await User.findByIdAndUpdate(req.userId ,{ name:name , addressLine1:adrresLine1 , city:city, country:country })
        if(!newUser){
           return res.status(404).json({message:"user not found"})
        }
        newUser.save()
        res.send(newUser)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"ERROR UPDATING USER"})
    }
}
const getCurrentUser = async (req : Request , res: Response)=>{
    try{
        const user = await User.findById( req.userId  )
        if(!user){
            return res.status(404).json( { message:"cannot find user" } )
        }
        res.status(200).json(user);

    }catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}


export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser
}
