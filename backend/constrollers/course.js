import { Course } from "../models/course.js";

export const addCourse = async (req, res) => {
    // const userId = req.userId;

    try {
        const { title, description, image, price, isFree } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "title is required"
            });
        }
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Description is required"
            });
        }
        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Image URL is required"
            });
        }

        const newCourse = new Course(req.body);
        await newCourse.save();

        return res.status(201).json({
            success: true,
            data: newCourse
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
};


export const getAllCourses = async (req, res) => {
    // const userId = req.userId;    
    // console.log('userId:', userId);

    try {
        const courses = await Course.find();
        return res.status(200).json({
            success: true,
            data: courses,
            total: courses.length
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
};

export const getCourse = async (req, res) => {
    // const userId = req.userId;    
    // console.log('userId:', userId);
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found"
            })
        };

        return res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
};


export const updateCourse = async (req, res) => {
    try {
        const { courseId, img } = req.body;

        const course = await Course.findByIdAndUpdate(
            courseId,
            { image: img },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}