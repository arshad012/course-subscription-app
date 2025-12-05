import { User } from "../models/index.js";
import bcrypt from "bcrypt";

export const SignupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "new user created",
            data: newUser
        })

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