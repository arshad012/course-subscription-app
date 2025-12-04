import { Router } from "express";
import { subscribeCourse, getAllSubscribedCourses, unsubscribeCourse } from "../constrollers/subscription.js";
import { authMiddleware } from "../middleware/index.js";

export const subscriptionRouter = Router();

subscriptionRouter.patch("/subscribe", authMiddleware, subscribeCourse);
subscriptionRouter.get("/my-courses", authMiddleware, getAllSubscribedCourses);
subscriptionRouter.patch("/unsubscribe", authMiddleware, unsubscribeCourse);