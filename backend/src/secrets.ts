import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const SERVER_PORT = process.env.SERVER_PORT;

export const CLIENT_URL = process.env.CLIENT_URL;

export const SERVER_URL = process.env.SERVER_URL;

export const JWT_SECRET = process.env.JWT_SECRET!;

export const AUTH_GITHUB_ID = process.env.AUTH_GITHUB_ID;

export const AUTH_GITHUB_SECRET = process.env.AUTH_GITHUB_SECRET;
