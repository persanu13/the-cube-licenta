import express, { Express, Request, Response } from "express";
import { CLIENT_URL, SERVER_PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["error", "warn"],
});

app.use(errorMiddleware);

app.listen(SERVER_PORT, () => {
  console.log("App working");
});
