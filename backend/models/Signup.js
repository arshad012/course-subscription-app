import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"]
    },
    password: {
        type: String,
        required: true,
        // match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*])[A-Za-z\d@#$%&*]+$/, "Invalid password"]
    },
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
}, { timestamps: true });

export const User = mongoose.model("Users", UserSchema);