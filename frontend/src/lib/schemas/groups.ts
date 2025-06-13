import { z } from "zod";

export const GroupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Course name must be at least 3 characters" }),
  color: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
    message: "Color must be a valid hex code (e.g., #000 or #ffffff)",
  }),
});
