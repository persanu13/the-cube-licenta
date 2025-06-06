import { z } from "zod";

export const CourseSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Course name must be at least 3 characters" }),
  color: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
    message: "Color must be a valid hex code (e.g., #000 or #ffffff)",
  }),
  grades: z
    .object({
      min: z
        .number({ invalid_type_error: "Min grade must be a number" })
        .int({ message: "Min grade must be an integer" })
        .min(1, { message: "Min grade must be at least 1" })
        .max(12, { message: "Min grade must be at most 12" }),
      max: z
        .number({ invalid_type_error: "Max grade must be a number" })
        .int({ message: "Max grade must be an integer" })
        .min(1, { message: "Max grade must be at least 1" })
        .max(12, { message: "Max grade must be at most 12" }),
    })
    .refine((data) => data.max >= data.min, {
      message: "Max grade must be greater than or equal to min grade",
      path: ["max"],
    }),
  subject: z.enum(["GEOMETRY", "ALGEBRA"], {
    errorMap: () => ({ message: "Subject must be GEOMETRY or ALGEBRA" }),
  }),
  visibility: z.enum(["PUBLIC", "PRIVATE"], {
    errorMap: () => ({ message: "Visibility must be PUBLIC or PRIVATE" }),
  }),
});
