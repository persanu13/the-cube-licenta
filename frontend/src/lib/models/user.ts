export type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  image: string;
  createdAt: string;
  updatedAt: string;
};
