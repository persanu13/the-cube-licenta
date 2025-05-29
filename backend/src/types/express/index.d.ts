import { User } from "../models/User";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User; // sau tipul tău
    }
  }
}

export {};
