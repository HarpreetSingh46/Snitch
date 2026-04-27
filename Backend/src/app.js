import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import ProductRouter from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
// import cors from "cors";
const app = express();

import Cartrouter from "./routes/cart.routes.js";
import { config } from "./config/config.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you would typically find or create a user in your database
      // For this example, we'll just return the profile
      return done(null, profile);
    },
  ),
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/products", ProductRouter);

app.use("/api/auth", authRoutes);
app.use("/api/cart", Cartrouter);

export default app;
