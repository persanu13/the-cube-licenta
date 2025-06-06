import { z } from "zod";

export const CourseSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Course name must be at least 3 characters" }),
    color: z
      .string()
      .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
        message: "Color must be a valid hex code (e.g., #000 or #ffffff)",
      }),
    min_grade: z
      .number({ invalid_type_error: "min_grade must be a number" })
      .int({ message: "min_grade must be an integer" })
      .min(1, { message: "min_grade must be at least 1" })
      .max(12, { message: "min_grade must be at most 12" }),
    max_grade: z
      .number({ invalid_type_error: "max_grade must be a number" })
      .int({ message: "max_grade must be an integer" })
      .min(1, { message: "max_grade must be at least 1" })
      .max(12, { message: "max_grade must be at most 12" }),
    subject: z.enum(["GEOMETRY", "ALGEBRA"], {
      errorMap: () => ({ message: "Subject must be GEOMETRY or ALGEBRA" }),
    }),
    visibility: z
      .enum(["PUBLIC", "PRIVATE"], {
        errorMap: () => ({ message: "Visibility must be PUBLIC or PRIVATE" }),
      })
      .optional()
      .default("PRIVATE"),
  })
  .refine((data) => data.max_grade >= data.min_grade, {
    message: "max_grade must be greater than or equal to min_grade",
    path: ["max_grade"],
  });
