import { Request, Response } from "express";
import { hashSync, compareSync } from "bcryptjs";
import { prismaClient } from "..";
import { users } from "../placeholder";

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
      createdAt: "asc",
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
