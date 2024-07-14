import { Request , Response } from "express"
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary"
import mongoose from "mongoose";

const createMyRestaurant = async (req : Request , res : Response)=>{
    try {
        
        const exisitingRestaurant =  await Restaurant.findOne( { user:req.userId } );
        
        if(exisitingRestaurant){
            return res.status(409).json({ message : " user restuarant alrady exists " });
        }

        const image = req.file as Express.Multer.File;

        const base64Image = Buffer.from(image.buffer).toString("base64")
        const dataURI = `data:${image.mimetype};base64,${base64Image}`

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)
        const restaurant = new Restaurant(req.body);
        restaurant.lastUpdated = new Date();
        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId)
        await restaurant.save();
        res.status(201).send(restaurant);

    }catch(err){
        console.log(err)
        res.status(500).json( { meessage : "Someething went wrong" } )

    }



}

const getMyCurrentRestaurant = async ( req:Request, res:Response )=>{
    try {
        const restaurant = await Restaurant.findOne({ user: req.userId });
        if (!restaurant) {
          return res.status(404).json({ message: "restaurant not found" });
        }
        res.json(restaurant);
      } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Error fetching restaurant" });
      }
}




export default {
    createMyRestaurant,
    getMyCurrentRestaurant
}