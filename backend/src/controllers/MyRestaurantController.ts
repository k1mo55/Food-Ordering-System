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

        const imageUrl = await uploadImage(req.file as Express.Multer.File);
        const restaurant = new Restaurant(req.body);
        restaurant.lastUpdated = new Date();
        restaurant.imageUrl =imageUrl;
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
const updateMyRestaurant = async ( req:Request , res:Response )=>{
    try{    
        let myRestaurant = await Restaurant.findOne( { user:req.userId } );
         if(!myRestaurant){
            return res.status(404).json( { message:" cannot find your restaurant " } )
         }
        myRestaurant.restaurantName = req.body.restaurantName;
        myRestaurant.city = req.body.city;
        myRestaurant.country = req.body.country;
        myRestaurant.deliveryPrice = req.body.deliveryPrice;
        myRestaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        myRestaurant.cuisines = req.body.cuisines;
        myRestaurant.menuItems = req.body.menuItems;
        myRestaurant.lastUpdated = new Date();
         if(req.file){
            const imageUrl = await uploadImage(req.file as Express.Multer.File)
            myRestaurant.imageUrl= imageUrl
         }

        await myRestaurant.save();
        res.status(200).send(myRestaurant);
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"something went wrong"})
    }
}











const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
  };



export default {
    createMyRestaurant,
    getMyCurrentRestaurant,
    updateMyRestaurant
}