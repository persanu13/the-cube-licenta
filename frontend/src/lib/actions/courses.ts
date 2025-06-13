"use server";

import { redirect } from "next/navigation";
import { SERVER_URL } from "../secrets";
import { State } from "../models/types";
import { CourseSchema } from "../schemas/course";
import { getToken } from "../auth/auth";
import { revalidatePath } from "next/cache";

export async function createCourse(
  prevState: State,
  formData: FormData
): Promise<State> {
  const values = {
    name: formData.get("name")?.toString() || "",
    min_grade: Number(formData.get("min_grade")?.toString()) || 0,
    max_grade: Number(formData.get("max_grade")?.toString()) || 0,
    visibility: formData.get("visibility")?.toString() || "",
    subject: formData.get("subject")?.toString() || "",
    color: formData.get("color")?.toString() || "",
  };

  const validatedFields = CourseSchema.safeParse({
    name: values.name,
    color: values.color,
    grades: { min: values.min_grade, max: values.max_grade },
    visibility: values.visibility,
    subject: values.subject,
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
    const res = await fetch(`${SERVER_URL}/api/courses/`, {
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

  revalidatePath("/teacher/courses");
  redirect("/teacher/courses");
}

export async function editCourse(
  courseId: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  const values = {
    name: formData.get("name")?.toString() || "",
    min_grade: Number(formData.get("min_grade")?.toString()) || 0,
    max_grade: Number(formData.get("max_grade")?.toString()) || 0,
    visibility: formData.get("visibility")?.toString() || "",
    subject: formData.get("subject")?.toString() || "",
    color: formData.get("color")?.toString() || "",
  };

  const validatedFields = CourseSchema.safeParse({
    name: values.name,
    color: values.color,
    grades: { min: values.min_grade, max: values.max_grade },
    visibility: values.visibility,
    subject: values.subject,
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
    const res = await fetch(`${SERVER_URL}/api/courses/${courseId}`, {
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

  revalidatePath("/teacher/courses");
  redirect("/teacher/courses");
}

export async function fetchTheachersCourses(
  query: string,
  subject: string,
  visibility: string
) {
  try {
    const token = await getToken();
    const res = await fetch(
      `${SERVER_URL}/api/courses/teacher-courses?q=${query}&subject=${subject}&visibility=${visibility}`,
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
    const courses = await res.json();
    return courses;
  } catch (e) {
    console.warn(e);
  }
}

export async function fetchStudentCourses(
  studentId: string,
  query: string,
  subject: string
) {
  try {
    const token = await getToken();

    const res = await fetch(
      `${SERVER_URL}/api/courses/student-courses?q=${query}&subject=${subject}&studentId=${studentId}`,
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

    const courses = await res.json();
    console.log(courses);
    return courses;
  } catch (e) {
    console.error(e);
  }
}

export async function fetchCourse(courseId: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/courses/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) return null;
    const course = await res.json();
    return course;
  } catch (e) {
    console.error(e);
  }
}

export async function fetchCourseContent(courseId: string) {
  try {
    const res = await fetch(`${SERVER_URL}/api/courses/${courseId}/content`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function updateCourseContent(courseId: string, content: any[]) {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/courses/content`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId: courseId, content: content }),
      credentials: "include",
    });
    if (!res.ok) return null;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteCourse(
  courseId: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const token = await getToken();
    const res = await fetch(`${SERVER_URL}/api/courses/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId: courseId }),
      credentials: "include",
    });
    if (!res.ok)
      return {
        success: false,
        message: "Ștergerea cursului a eșuat.",
      };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Ștergerea cursului a eșuat." };
  }

  revalidatePath("/teacher/courses");
  redirect("/teacher/courses");
}
