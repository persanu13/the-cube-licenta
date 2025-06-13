import { Router } from "express";
import { errorHandler } from "../error-handler";

import authMiddleware from "../middlewares/auth";
import teacherMiddleware from "../middlewares/teacher";
import {
  addCourseToGroup,
  addStudentToGroup,
  createGroup,
  deleteGroup,
  getGroupById,
  getGroupCourses,
  getGroupStudents,
  getTeachersGroups,
  removeCourseFromGroup,
  removeStudentFromGroup,
  updateGroup,
} from "../controllers/groups";

const groupsRouter: Router = Router();

groupsRouter.post(
  "/",
  [authMiddleware, teacherMiddleware],
  errorHandler(createGroup)
);

groupsRouter.get(
  "/teacher-groups",
  [authMiddleware, teacherMiddleware],
  errorHandler(getTeachersGroups)
);

groupsRouter.get(
  "/:groupId",
  [authMiddleware, teacherMiddleware],
  errorHandler(getGroupById)
);

groupsRouter.get(
  "/:groupId/courses",
  [authMiddleware, teacherMiddleware],
  errorHandler(getGroupCourses)
);

groupsRouter.get(
  "/:groupId/students",
  [authMiddleware, teacherMiddleware],
  errorHandler(getGroupStudents)
);

groupsRouter.patch(
  "/:groupId",
  [authMiddleware, teacherMiddleware],
  errorHandler(updateGroup)
);

groupsRouter.delete(
  "/delete",
  [authMiddleware, teacherMiddleware],
  errorHandler(deleteGroup)
);

groupsRouter.post(
  "/add-course",
  [authMiddleware, teacherMiddleware],
  errorHandler(addCourseToGroup)
);

groupsRouter.post(
  "/add-student",
  [authMiddleware, teacherMiddleware],
  errorHandler(addStudentToGroup)
);

groupsRouter.post(
  "/remove-course",
  [authMiddleware, teacherMiddleware],
  errorHandler(removeCourseFromGroup)
);

groupsRouter.post(
  "/remove-student",
  [authMiddleware, teacherMiddleware],
  errorHandler(removeStudentFromGroup)
);

export default groupsRouter;
