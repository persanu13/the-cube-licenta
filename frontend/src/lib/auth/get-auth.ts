"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

type PayloadJWT = {
  userId: string;
  role: "ADMIN" | "STUDENT" | "TEACHER";
  iat: number;
  exp: number;
};

export async function getAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const payload: PayloadJWT = jwt.verify(token, JWT_SECRET!) as PayloadJWT;
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}
