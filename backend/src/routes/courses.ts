import { Router } from "express";
import { errorHandler } from "../error-handler";

import authMiddleware from "../middlewares/auth";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourseContent,
  getStudentCourses,
  getTeachersCourses,
  updateCourse,
  updateCourseContent,
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

coursesRouter.get(
  "/student-courses",
  [authMiddleware],
  errorHandler(getStudentCourses)
);

coursesRouter.get(
  "/:courseId",
  [authMiddleware, teacherMiddleware],
  errorHandler(getCourseById)
);

coursesRouter.get("/:courseId/content", errorHandler(getCourseContent));

coursesRouter.patch(
  "/content",
  [authMiddleware, teacherMiddleware],
  errorHandler(updateCourseContent)
);

coursesRouter.patch(
  "/:courseId",
  [authMiddleware, teacherMiddleware],
  errorHandler(updateCourse)
);

coursesRouter.delete(
  "/delete",
  [authMiddleware, teacherMiddleware],
  errorHandler(deleteCourse)
);

export default coursesRouter;
