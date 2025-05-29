import { State } from "../models/types";
import { LoginSchema } from "../schemas/user";
import { SERVER_URL } from "../secrets";

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

    if (res.ok) {
      return {
        errors: {},
        message: "Login Succesful!",
        values: { email: "" },
      };
    }
    const error = await res.json();

    if (error.errorCode == 1003 || error.errorCode == 1001) {
      return {
        errors: {},
        message: "Username or password is incorect!",
        values: { email: formData.get("email")?.toString() || "" },
      };
    }
    console.error(error);
    return {
      errors: {},
      message: "An undefined error occurred. Please try again.!",
      values: { email: formData.get("email")?.toString() || "" },
    };
  } catch (e) {
    console.error(e);
    return {
      errors: {},
      message: "An unexpected error occurred. Please try again.",
      values: { email: formData.get("email")?.toString() || "" },
    };
  }
}
