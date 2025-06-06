import { faker } from "@faker-js/faker";

type UserInput = {
  name?: string;
  email: string;
  password?: string;
  role?: "ADMIN" | "TEACHER" | "STUDENT";
  image?: string;
  emailVerified?: Date;
};

export const generateMockUsers = (count: number): UserInput[] => {
  const roles: ("ADMIN" | "TEACHER" | "STUDENT")[] = [
    "ADMIN",
    "TEACHER",
    "STUDENT",
  ];

  return Array.from({ length: count }, (_, i) => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 10 }),
    role: roles[Math.floor(Math.random() * roles.length)],
  }));
};

export const users: UserInput[] = [
  {
    name: "Admin",
    email: "admin@admin.com",
    password: "admin12",
    role: "ADMIN",
  },
  {
    name: "Teacher",
    email: "teacher@gmail.com",
    password: "teacher12",
    role: "TEACHER",
  },
  ...generateMockUsers(50),
];
