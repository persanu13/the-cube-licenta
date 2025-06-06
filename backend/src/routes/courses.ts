import { Router } from "express";
import { errorHandler } from "../error-handler";

import authMiddleware from "../middlewares/auth";
import {
  createCourse,
  getCourseContent,
  getTeachersCourses,
  updatCourseContent,
} from "../controllers/courses";
import teacherMiddleware from "../middlewares/teacher";

const coursesRouter: Router = Router();

coursesRouter.post(
  "/",
  [authMiddleware, teacherMiddleware],
  errorHandler(createCourse)
);

coursesRouter.get(
  "/teacher-courses",
  [authMiddleware, teacherMiddleware],
  errorHandler(getTeachersCourses)
);

coursesRouter.get("/:courseId/content", errorHandler(getCourseContent));

coursesRouter.patch(
  "/content",
  [authMiddleware, teacherMiddleware],
  errorHandler(updatCourseContent)
);

export default coursesRouter;
