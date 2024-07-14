import { NextFunction, Request , Response } from "express";
import { body, validationResult } from "express-validator";

const handleVaidationErrors = async(req:Request , res: Response , next : NextFunction)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array})
    }
    next();


}



export const ValidateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AdressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("city must be a string"),
    body("country").isString().notEmpty().withMessage("country must be a string"),
    handleVaidationErrors
];

export const ValidateMyRestaurantRequest = [
    body("restaurantName").isString().notEmpty().withMessage("restaurantName is required"),
    body("city").isString().notEmpty().withMessage("city is required"),
    body("country").isString().notEmpty().withMessage("country is required"),
    body("deliveeryPrice").isFloat( { min:0 } ).withMessage(" Delivery price must be positive number "),
    body("estimatedDeliveryTime").isFloat( { min:0 } ).withMessage(" Delivery price must be positive number "),
    body("cuisines").isArray().withMessage(" cuisines must be an array ").notEmpty().withMessage("cusines cannot be empty"),
    body("menuItems").isArray().withMessage(" menuItems must be an array "),
    body("menuItems.*.name").notEmpty().withMessage(" menuItems name is required "),
    body("menuItems.*.price").isFloat( { min:0 } ).withMessage("price must be a positive number"),
    handleVaidationErrors
]


