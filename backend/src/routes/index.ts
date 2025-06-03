import { Router } from "express";
import authRoutes from "./auth";
import lessonsRouter from "./lessons";
import usersRouter from "./users";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/users", usersRouter);
rootRouter.use("/lessons", lessonsRouter);

export default rootRouter;
