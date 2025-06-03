import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createLeasson } from "../controllers/leassons";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { getCount, getUsers, seedUsers } from "../controllers/users";

const usersRouter: Router = Router();

usersRouter.get(
  "/filtred",
  [authMiddleware, adminMiddleware],
  errorHandler(getUsers)
);

usersRouter.get(
  "/count",
  [authMiddleware, adminMiddleware],
  errorHandler(getCount)
);

usersRouter.post("/seed", errorHandler(seedUsers));

export default usersRouter;
