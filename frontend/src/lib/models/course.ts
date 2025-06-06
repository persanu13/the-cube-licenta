export type Course = {
  id: string;
  name: string;
  autorName?: string;
  min_grade: number;
  max_grade: number;
  subject: "ALGEBRA" | "GEOMETRY";
  visibility: "PRIVATE" | "PUBLIC";
  color: string;

  createdAt: string;
  updatedAt?: string;
};
