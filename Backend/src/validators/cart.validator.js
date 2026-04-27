import {param, body,validationResult} from "express-validator";  

const validateRequests = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("VALIDATION ERROR:", errors.array());
        console.log("REQUEST BODY:", req.body);
        return res.status(400).json({ errors: errors.array(), success: false });
    }   
    next();
}

export const validateAddToCart = [
    body("productId").notEmpty().withMessage("Product ID is required"),
    body("variantId").notEmpty().withMessage("Variant ID is required"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    validateRequests
]
