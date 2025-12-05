import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LoginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            })
        };
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            })
        };

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Wrong password"
            })
        }

        const generateToken = (userId) => {
            return jwt.sign(
                { id: userId },             
                process.env.SECRET_KEY,
                { expiresIn: "7d" }
            );
        };
        const token = generateToken(existingUser._id);

        return res.status(200).json({
            success: true,
            token,
            data: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

    } catch (error) {
        console.log('error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
            errorName: error.name
        })
    }
};