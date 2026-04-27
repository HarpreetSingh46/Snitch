import express from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import multer from "multer";
import { addProductVariant, createProduct, GetAllProducts ,getProductDetail} from "../controllers/product.controller.js";
import { createProductValidator } from "../validators/product.validator.js";
import {GetSellerProducts} from "../controllers/product.controller.js "
const ProductRouter = express.Router();
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { 
        fileSize: 5 * 1024 * 1024 
    }, 
});



 
ProductRouter.post("/", authenticateSeller,  upload.array("images", 7 ) ,createProductValidator   , createProduct);

ProductRouter.get("/seller", authenticateSeller , GetSellerProducts)

ProductRouter.get("/",GetAllProducts)    

ProductRouter.get("/detail/:id", getProductDetail)


ProductRouter.post("/:productId/variants", authenticateSeller, upload.array("images", 7), addProductVariant);   

export default ProductRouter