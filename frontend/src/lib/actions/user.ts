"use server";

import { redirect } from "next/navigation";
import { State } from "../models/types";
import { RegisterSchema } from "../schemas/user";
import { SERVER_URL } from "../secrets";
import { getToken } from "../auth/auth";

export async function signUp(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role"),
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

  const { name, email, password, confirmPassword, role } = validatedFields.data;

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
        role,
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

export async function fetchUsers(
  query: string,
  role: string,
  currentPage: number,
  rows: number
) {
  try {
    const token = await getToken();
    const res = await fetch(
      `${SERVER_URL}/api/users/filtred?q=${query}&role=${role}&page=${currentPage}&rows=${rows}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    if (!res.ok) return null;
    const users = await res.json();
    return users;
  } catch (e) {
    console.error(e);
  }
}

export async function countUsers(query: string, role: string) {
  try {
    const token = await getToken();
    const res = await fetch(
      `${SERVER_URL}/api/users/count?q=${query}&role=${role}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    if (!res.ok) return null;
    const users = await res.json();
    return users;
  } catch (e) {
    console.error(e);
  }
}

export async function getRoleCounts() {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/users/role-count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (!res.ok) return null;
    const statistics = await res.json();
    return statistics;
  } catch (e) {
    console.error(e);
  }
}

export async function getWeeklyUserCount() {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/users/weekly-count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (!res.ok) return null;
    const statistics = await res.json();
    return statistics;
  } catch (e) {
    console.error(e);
  }
}

export async function getMonthlyUserCount() {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/users/monthly-count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (!res.ok) return null;
    const statistics = await res.json();
    return statistics;
  } catch (e) {
    console.error(e);
  }
}
