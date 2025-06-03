export type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
  image: string;
  createdAt: string;
  updatedAt: string;
};
