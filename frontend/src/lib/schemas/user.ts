import z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string({ invalid_type_error: "Please enter a username." })
      .min(1, "Username cannot be empty."),
    email: z
      .string({ invalid_type_error: "Please enter an email." })
      .min(1, "Email cannot be empty.")
      .email("Please enter a valid email."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      ),
    confirmPassword: z.string(),
    role: z.enum(["STUDENT", "TEACHER"], {
      errorMap: () => ({ message: "Role must be Student or Teacher" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter a valid password" }),
});
