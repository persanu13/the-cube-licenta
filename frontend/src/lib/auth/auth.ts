"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { SERVER_URL } from "../secrets";
import { redirect } from "next/navigation";
import { LoginSchema } from "../schemas/user";
import { State } from "../models/types";

type PayloadJWT = {
  userId: string;
  role: "ADMIN" | "STUDENT" | "TEACHER";
  iat: number;
  exp: number;
};

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) return token;
  return null;
}

export async function getAuth() {
  const token = await getToken();
  if (!token) return null;
  try {
    const payload = jwt.decode(token) as PayloadJWT | null;
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function signIn(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
      values: { email: formData.get("email")?.toString() || "" },
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await fetch(`${SERVER_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      if (error.errorCode == 1003 || error.errorCode == 1001) {
        return {
          message: "Username or password is incorect!",
          values: { email: formData.get("email")?.toString() || "" },
        };
      }
      throw new Error(error);
    }

    const data = await res.json();
    const token = data.token;
    const user = data.user;
    if (!token) {
      throw new Error("Server don't send the token!");
    }

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: user.role === "ADMIN" ? 60 * 60 : 60 * 60 * 24 * 30,
    });
  } catch (e) {
    console.error(e);
    return {
      message: "An unexpected error occurred. Please try again.",
      values: { email: formData.get("email")?.toString() || "" },
    };
  }
  redirect("/auth");
}

export async function githubAuth() {
  redirect(`${SERVER_URL}/api/auth/github`);
}

export async function signOut() {
  try {
    const token = await getToken();
    if (!token) redirect("/auth");

    const cookieStore = await cookies();
    cookieStore.set("token", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });

    const res = await fetch(`${SERVER_URL}/api/auth/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (!res.ok) {
      const error = await res.json();
      if (error.errorCode == 1005) {
        console.error("Cannot sign out - no user is currently logged in!");
      }
    }
  } catch (e) {
    console.error(e);
  }
  redirect("/auth");
}

export async function me() {
  const token = await getToken();
  try {
    const res = await fetch(`${SERVER_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (res.ok) return null;
    const user = await res.json();
    return user;
  } catch (e) {
    console.error(e);
  }
}
