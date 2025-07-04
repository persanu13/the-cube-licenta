import { User } from "../models/User";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      token?: string;
    }
  }
}

export {};
