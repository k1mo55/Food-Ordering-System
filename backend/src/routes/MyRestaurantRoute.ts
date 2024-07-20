import  express from 'express';
const router = express.Router();
import MyRestaurantController from "../controllers/MyRestaurantController"
import multer from 'multer';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { ValidateMyRestaurantRequest } from '../middleware/validation';


const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024  //5 megabytes
    }

});


router.post("/",
    jwtCheck,
    jwtParse,
    upload.single("imageFile"),
    ValidateMyRestaurantRequest,
    MyRestaurantController.createMyRestaurant
);
router.get("/order",
    jwtCheck,
    jwtParse,
    MyRestaurantController.getMyRestaurantOrders
)

router.get('/',
    jwtCheck,
    jwtParse,
    MyRestaurantController.getMyCurrentRestaurant
)
router.patch("/order/:orderId/status",
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateOrderStatus
)

router.put("/",
    jwtCheck ,
    jwtParse,
    upload.single("imageFile"),
    ValidateMyRestaurantRequest,
    MyRestaurantController.updateMyRestaurant
);




export default router