import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createLeasson } from "../controllers/leassons";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const lessonsRouter: Router = Router();

lessonsRouter.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createLeasson)
);

export default lessonsRouter;
