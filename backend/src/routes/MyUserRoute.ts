import express from "express"
import MyUserController from "../controllers/MyUserController"
import { jwtCheck, jwtParse } from "../middleware/auth";
import { ValidateMyUserRequest } from "../middleware/validation";


const router = express.Router();
router.get("/",jwtCheck, jwtParse,MyUserController.getCurrentUser);
router.post("/", jwtCheck , MyUserController.createCurrentUser)
router.put("/", jwtCheck , jwtParse , ValidateMyUserRequest ,MyUserController.updateCurrentUser);


export default router