import { Router } from "express";
import authRoutes from "./auth";

import usersRouter from "./users";
import coursesRouter from "./courses";
import groupsRouter from "./groups";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/users", usersRouter);
rootRouter.use("/courses", coursesRouter);
rootRouter.use("/groups", groupsRouter);

export default rootRouter;
