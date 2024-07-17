 import  express  from "express";
 import { body, validationResult ,param} from "express-validator";
import RestaurantController from "../controllers/RestaurantController";


 const router = express.Router();


 router.get('/search/:city',
    param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("city parameter must be a valid string"),
    RestaurantController.searchRestaurant

)

router.get('/:id',param("id")
.isString()
.trim()
.notEmpty()
.withMessage("id parameter must be a valid string")
 ,RestaurantController.getRestaurant
);





 export default router