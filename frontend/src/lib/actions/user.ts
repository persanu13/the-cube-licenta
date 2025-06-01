"use server";

import { redirect } from "next/navigation";
import { State } from "../models/types";
import { RegisterSchema } from "../schemas/user";
import { SERVER_URL } from "../secrets";

export default async function signUp(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  const resendValues = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
  };
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
      values: resendValues,
    };
  }

  const { name, email, password, confirmPassword } = validatedFields.data;

  try {
    const res = await fetch(`${SERVER_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      if (error.errorCode == 1002) {
        return {
          message: "Email already used!",
          values: resendValues,
        };
      }
      throw new Error(error);
    }
  } catch (e) {
    console.error(e);
    return {
      message: "An unexpected error occurred. Please try again.",
      values: resendValues,
    };
  }

  redirect("/auth?tab=login");
}
