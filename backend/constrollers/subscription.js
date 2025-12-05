import { User } from "../models/Signup.js";
// import { Course } from "../models/course.js";

export const subscribeCourse = async (req, res) => {
    // const userId = req.userId;
    // console.log('userId:', userId);
    try {
        const { userId, course } = req.body;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "No userId found"
            });
        }
        if (!course._id) {
            return res.status(400).json({
                success: false,
                message: "Course information is required"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Failed to fetch user or it is not in database, please retry"
            });
        }

        const alreadySubscribed = user.subscriptions.some(
            (c) => c._id.toString() === course._id.toString()
        );

        if (alreadySubscribed) {
            return res.status(409).json({
                success: false,
                message: "You have already subscribed to this course"
            });
        }


        user.subscriptions.push(course);
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Course subscribed successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
};


export const getAllSubscribedCourses = async (req, res) => {
    // const userId = req.userId;
    // console.log('userId:', userId);
    try {
        const { userId, courseType } = req.query;
        let match = {};
        let user;

        switch (courseType) {
            case "All":
                user = await User.findById(userId).populate("subscriptions");
                break;
            case "Free":
            case "Paid":
                if (courseType === "Free") match.isFree = true;
                else if (courseType === "Paid") match.isFree = false;

                user = await User.findById(userId).populate({
                    path: "subscriptions",
                    match
                });
                break;
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Associate user not found, please try again"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


export const unsubscribeCourse = async (req, res) => {
    // const userId = req.userId;
    // console.log('userId:', userId);
    try {
        const { userId, courseId } = req.query;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user id is required to unsubcribe this course"
            })
        };
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "course id is required to unsubcribe this course"
            })
        };

        const user = await User.findById(userId).populate("subscriptions");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Failed to fetch user, please try again"
            })
        };

        user.subscriptions = user.subscriptions.filter(c => c._id != courseId);
        await user.save();

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
};