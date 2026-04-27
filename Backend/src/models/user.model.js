import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,   
        required: [ true, "Username is required"],
        unique: true,
    }, 
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer",
    }, 
    email: {
        type: String,
        required: [ true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required:function() {
            return !this.googleId;
        },
    },

    googleId: {
        type: String,
    },
    contact:{
        type: String,
        required: [ false, "Contact is required"],
    }
}, { timestamps: true });

    userSchema.pre("save", async function () {
        if (!this.isModified("password")) {
            return ;
        }

        const hash =  await bcrypt.hash(this.password, 10);
        this.password = hash;
        
    });

    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

const userModel = mongoose.model("User", userSchema);

export default userModel;