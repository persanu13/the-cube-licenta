"use server";

import { redirect } from "next/navigation";
import { SERVER_URL } from "../secrets";
import { State } from "../models/types";
import { getToken } from "../auth/auth";
import { revalidatePath } from "next/cache";
import { GroupSchema } from "../schemas/groups";
import z from "zod";

export async function createGroup(
  prevState: State,
  formData: FormData
): Promise<State> {
  const values = {
    name: formData.get("name")?.toString() || "",
    color: formData.get("color")?.toString() || "",
  };

  const validatedFields = GroupSchema.safeParse({
    name: values.name,
    color: values.color,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
      values: values,
    };
  }

  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      return {
        message: "An unexpected error occurred. Please try again.",
        values: values,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      message: "An unexpected error occurred. Please try again.",
      values: values,
    };
  }

  revalidatePath("/teacher/groups");
  redirect("/teacher/groups");
}

export async function editGroup(
  groupId: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const values = {
    name: formData.get("name")?.toString() || "",
    color: formData.get("color")?.toString() || "",
  };

  const validatedFields = GroupSchema.safeParse({
    name: values.name,
    color: values.color,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
      values: values,
    };
  }

  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      return {
        message: "An unexpected error occurred. Please try again.",
        values: values,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      message: "An unexpected error occurred. Please try again.",
      values: values,
    };
  }

  revalidatePath("/teacher/groups");
  redirect("/teacher/groups");
}

export async function fetchGroup(groupId: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) return null;
    const group = await res.json();
    return group;
  } catch (e) {
    console.error(e);
  }
}

export async function fetchGroupStudents(groupId: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/${groupId}/students`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) return null;
    const students = await res.json();
    return students;
  } catch (e) {
    console.error(e);
  }
}

export async function fetchGroupCourses(groupId: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/${groupId}/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) return null;
    const courses = await res.json();
    return courses;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteGroup(
  groupId: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ groupId: groupId }),
      credentials: "include",
    });
    if (!res.ok)
      return {
        success: false,
        message: "Ștergerea groupului a eșuat.",
      };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Ștergerea groupului a eșuat." };
  }

  revalidatePath("/teacher/groups");
  redirect("/teacher/groups");
}

export async function fetchTheachersGroups(query: string) {
  try {
    const token = await getToken();
    const res = await fetch(
      `${SERVER_URL}/api/groups/teacher-groups?q=${query}`,
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
    const groups = await res.json();
    return groups;
  } catch (e) {
    console.error(e);
  }
}

export async function addCourseToGroup(
  prevState: State,
  formData: FormData
): Promise<State> {
  const values = {
    groupId: formData.get("groupId")?.toString() || "",
    courseId: formData.get("courseId")?.toString() || "",
  };

  const validated = z
    .object({
      groupId: z.string().min(1),
      courseId: z.string().min(1),
    })
    .safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Validation failed",
      values: values,
    };
  }

  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/add-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      return {
        message: "Failed to add course. Please try again.",
        values: values,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      message: "Unexpected error occurred.",
      values: values,
    };
  }

  revalidatePath(`/teacher/groups/${values.groupId}/courses`);
  redirect(`/teacher/groups/${values.groupId}/courses`);
}

export async function addStudentToGroup(
  prevState: State,
  formData: FormData
): Promise<State> {
  const values = {
    groupId: formData.get("groupId")?.toString() || "",
    studentId: formData.get("studentId")?.toString() || "",
  };
  console.log(values);

  const validated = z
    .object({
      groupId: z.string().min(1),
      studentId: z.string().min(1),
    })
    .safeParse(values);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Validation failed",
      values: values,
    };
  }

  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/add-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      return {
        message: "Failed to add student. Please try again.",
        values: values,
      };
    }
  } catch (e) {
    console.error(e);
    return {
      message: "Unexpected error occurred.",
      values: values,
    };
  }
  revalidatePath(`/teacher/groups/${values.groupId}/students`);
  redirect(`/teacher/groups/${values.groupId}/students`);
}

export async function removeCourseFromGroup(
  groupId: string,
  courseId: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/remove-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ groupId, courseId }),
    });

    if (!res.ok) {
      return {
        message: "Failed to remove course. Please try again.",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      message: "Unexpected error occurred.",
    };
  }

  revalidatePath(`/teacher/groups/${groupId}/courses`);
  redirect(`/teacher/groups/${groupId}/courses`);
}

export async function removeStudentFromGroup(
  groupId: string,
  studentId: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/groups/remove-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ groupId, studentId }),
    });

    if (!res.ok) {
      return {
        message: "Failed to remove student. Please try again.",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      message: "Unexpected error occurred.",
    };
  }

  revalidatePath(`/teacher/groups/${groupId}/students`);
  redirect(`/teacher/groups/${groupId}/students`);
}
