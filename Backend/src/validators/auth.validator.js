import { body,validationResult  } from 'express-validator';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const  validateRegister = [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact").isLength({ min: 10, max: 15 }).withMessage("Invalid contact number").notEmpty().withMessage("Contact number is required"),
    body("isSeller").isBoolean().withMessage("isSeller must be a boolean value").notEmpty().withMessage("isSeller must be a boolean value"),
    validateRequest
];

export const validateLogin = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validateRequest
];