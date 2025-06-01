import { Router } from "express";
import {
  signIn,
  me,
  signUp,
  githubAuth,
  githubAuthCallback,
  signOut,
} from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signUp));
authRoutes.post("/signout", [authMiddleware], errorHandler(signOut));
authRoutes.post("/signin", errorHandler(signIn));

authRoutes.get("/github", githubAuth);
authRoutes.get("/github/callback", githubAuthCallback);

authRoutes.get("/me", [authMiddleware], errorHandler(me));

export default authRoutes;
