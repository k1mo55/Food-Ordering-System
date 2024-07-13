import express , {Request , Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from './routes/MyUserRoute'
import { v2 as cloudinary } from 'cloudinary';
import myRestaurantRoute from "./routes/MyRestaurantRoute"
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/my/user",myUserRoute);
app.use("/api/my/restaurant",myRestaurantRoute);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string ).then(()=>{
    app.listen(7000,()=>{
        console.log("server started on 7000 and data base connected")
    
    })
})
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});