import  express from 'express';
const router = express.Router();
import MyRestaurantController from "../controllers/MyRestaurantController"
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024  //5 megabytes
    }

});


router.post("/",upload.single("imageFile"),MyRestaurantController.createMyRestaurant);

export default router