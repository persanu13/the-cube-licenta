import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import {
  getCount,
  getMonthlyUserCount,
  getRoleCounts,
  getUsers,
  getWeeklyUserCount,
  seedUsers,
} from "../controllers/users";

const usersRouter: Router = Router();

usersRouter.get(
  "/filtred",
  [authMiddleware, adminMiddleware],
  errorHandler(getUsers)
);

usersRouter.get(
  "/weekly-count",
  [authMiddleware, adminMiddleware],
  errorHandler(getWeeklyUserCount)
);

usersRouter.get(
  "/weekly-count",
  [authMiddleware, adminMiddleware],
  errorHandler(getWeeklyUserCount)
);

usersRouter.get(
  "/monthly-count",
  [authMiddleware, adminMiddleware],
  errorHandler(getMonthlyUserCount)
);

usersRouter.get(
  "/role-count",
  [authMiddleware, adminMiddleware],
  errorHandler(getRoleCounts)
);

usersRouter.get(
  "/count",
  [authMiddleware, adminMiddleware],
  errorHandler(getCount)
);

usersRouter.post("/seed", errorHandler(seedUsers));

export default usersRouter;
