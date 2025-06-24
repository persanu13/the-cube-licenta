import { Request, Response } from "express";
import { hashSync, compareSync } from "bcryptjs";
import { prismaClient } from "..";
import { users } from "../placeholder";
import {
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  startOfYear,
  endOfYear,
} from "date-fns";

const roleMapping = {
  Admin: "ADMIN",
  Student: "STUDENT",
  Teacher: "TEACHER",
} as const;

type RoleKey = keyof typeof roleMapping;

export const getUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const rows = parseInt(req.query.rows as string) || 10;
  const frontendRole = req.query.role as RoleKey | undefined;
  const prismaRole = frontendRole ? roleMapping[frontendRole] : undefined;
  const searchQuery = req.query.q as string | undefined;
  console.log(frontendRole);
  const skip = (page - 1) * rows;

  const users = await prismaClient.user.findMany({
    where: {
      AND: [
        prismaRole ? { role: prismaRole } : {},
        searchQuery
          ? {
              OR: [
                { name: { contains: searchQuery, mode: "insensitive" } },
                { email: { contains: searchQuery, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    },
    skip,
    take: rows,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      emailVerified: true,
    },
  });
  res.json(users);
};

export const getCount = async (req: Request, res: Response) => {
  const frontendRole = req.query.role as RoleKey | undefined;
  const prismaRole = frontendRole ? roleMapping[frontendRole] : undefined;
  const searchQuery = req.query.q as string | undefined;

  const totalCount = await prismaClient.user.count({
    where: {
      AND: [
        prismaRole ? { role: prismaRole } : {},
        searchQuery
          ? {
              OR: [
                { name: { contains: searchQuery, mode: "insensitive" } },
                { email: { contains: searchQuery, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    },
  });

  res.json(totalCount);
};

export const getRoleCounts = async (req: Request, res: Response) => {
  const [adminCount, teacherCount, studentCount] = await Promise.all([
    prismaClient.user.count({ where: { role: "ADMIN" } }),
    prismaClient.user.count({ where: { role: "TEACHER" } }),
    prismaClient.user.count({ where: { role: "STUDENT" } }),
  ]);

  res.json({
    total: adminCount + teacherCount + studentCount,
    admin: adminCount,
    teacher: teacherCount,
    student: studentCount,
  });
};

export const getWeeklyUserCount = async (req: Request, res: Response) => {
  const now = new Date();

  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const users = await prismaClient.user.findMany({
    where: {
      createdAt: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
    select: {
      createdAt: true,
    },
  });

  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const result: Record<string, number> = {};
  const dayNames = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  dayNames.forEach((day) => {
    result[day] = 0;
  });

  for (const user of users) {
    const dayIndex = new Date(user.createdAt).getDay();
    const index = (dayIndex + 6) % 7;
    const dayName = dayNames[index];
    result[dayName]++;
  }

  res.json(result);
};

export const getMonthlyUserCount = async (req: Request, res: Response) => {
  const now = new Date();

  const yearStart = startOfYear(now);
  const yearEnd = endOfYear(now);

  const users = await prismaClient.user.findMany({
    where: {
      createdAt: {
        gte: yearStart,
        lte: yearEnd,
      },
    },
    select: {
      createdAt: true,
    },
  });

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const result: Record<string, number> = {};
  monthNames.forEach((month) => {
    result[month] = 0;
  });

  for (const user of users) {
    const monthIndex = new Date(user.createdAt).getMonth(); // 0 = Jan
    const monthName = monthNames[monthIndex];
    result[monthName]++;
  }

  res.json(result);
};

export const seedUsers = async (req: Request, res: Response) => {
  const usersIn = users;
  const createdUsers = await Promise.all(
    usersIn.map(async (user) => {
      return prismaClient.user.create({
        data: {
          name: user.name || null,
          email: user.email,
          password: user.password ? hashSync(user.password, 10) : null,
          role: user.role ?? "STUDENT",
          image: user.image || null,
          emailVerified: user.emailVerified || null,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          emailVerified: true,
          createdAt: true,
        },
      });
    })
  );

  res.status(201).json({
    message: "Users seeded successfully",
    users: createdUsers,
  });
};
