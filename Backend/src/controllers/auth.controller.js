import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";


async function sendTokenResponse(user, res, message) {

    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("token", token)

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            username: user.username,
            role: user.role
        }
    })

}


export const register = async (req, res) => {
    const { email, contact, password, username, isSeller } = req.body;

    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            username,
            role: isSeller ? "seller" : "buyer"
        })

        await sendTokenResponse(user, res, "User registered successfully")

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }   
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    await sendTokenResponse(user, res, "Login successful")

}


export const googleCallback = async (req, res) => {
    const { id, emails, displayName, photos } = req.user;   

    const email = emails[0].value;
    const username = displayName;
    const profilePicture = photos[0].value;

    let user = await userModel.findOne({ email })

    if (!user) {
         newUser = await userModel.create({
            email,
            username: username,
            googleId: id,
           
        })
        
    }

    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("token", token)
    res.redirect("http://localhost:5173/")

    // Here you would typically find or create a user in your database based on the Google profile information
    // For this example, we'll just return the profile information as a response
    res.json({ message: "Google login successful", profile: userProfile });
}


export const getMe = async (req, res) => {
    const user = req.user;
    res.status(200).json({  
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            username: user.username,    
            role: user.role
        }
    })
}