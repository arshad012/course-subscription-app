import { Router } from "express";
import { addCourse, getAllCourses, updateCourse, getCourse } from "../constrollers/course.js";

import { authMiddleware } from "../middleware/index.js";

export const courseRouter = Router();

courseRouter.post("/add-course", addCourse);
courseRouter.get("/courses", authMiddleware, getAllCourses);
courseRouter.patch("/update-course", updateCourse);
courseRouter.get("/courses/:courseId", authMiddleware, getCourse);