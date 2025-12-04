import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    isFree: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);