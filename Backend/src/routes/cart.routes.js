import express from "express";
const router = express.Router();
import { authenticateUser } from '../middleware/auth.middleware.js'; 
import { validateAddToCart } from "../validators/cart.validator.js";  
import { addToCart, getCart, removeFromCart, updateCartItemQuantity } from "../controllers/cart.controller.js";



const Cartrouter = express.Router();

Cartrouter.post("/add",authenticateUser, validateAddToCart,addToCart)
Cartrouter.get("/",authenticateUser,getCart)
Cartrouter.delete("/remove", authenticateUser, removeFromCart)
Cartrouter.patch("/update", authenticateUser, updateCartItemQuantity)
export default Cartrouter;