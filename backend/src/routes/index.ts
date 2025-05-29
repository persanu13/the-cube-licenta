import { Router } from "express";
import authRoutes from "./auth";
import lessonsRouter from "./lessons";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/lessons", lessonsRouter);

export default rootRouter;
