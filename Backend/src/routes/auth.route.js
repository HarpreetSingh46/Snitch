import {Router} from 'express';
import {validateRegister, validateLogin} from "../validators/auth.validator.js";
import {register,loginUser, googleCallback, getMe} from '../controllers/auth.controller.js';

 import passport from "passport";
import { authenticateUser } from '../middleware/auth.middleware.js';
const authRouter = Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, loginUser);

authRouter.get("/google",
     passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport.authenticate("google",{session: false ,failureRedirect: "http://localhost:5173/login"}  ),
googleCallback,

);

authRouter.get("/me", authenticateUser,getMe);
export default authRouter;





 