import { Request, Response } from "express";
import { prismaClient } from "..";
import { CourseSchema } from "../schema/course";
import { PrismaClient, Subject, Visibility } from "@prisma/client";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";

export const createCourse = async (req: Request, res: Response) => {
  CourseSchema.parse(req.body);
  const { name, color, min_grade, max_grade, subject, visibility } = req.body;

  const course = await prismaClient.course.create({
    data: {
      name,
      color: color,
      min_grade,
      max_grade,
      subject,
      visibility,
      creatorId: req.user.id,
    },
  });

  res.json(course);
};

export const getTeachersCourses = async (req: Request, res: Response) => {
  const subject =
    (req.query.subject as string)?.toUpperCase() in Subject
      ? ((req.query.subject as string)?.toUpperCase() as Subject)
      : null;

  const visibility =
    (req.query.visibility as string)?.toUpperCase() in Visibility
      ? ((req.query.visibility as string)?.toUpperCase() as Visibility)
      : null;

  const searchQuery = req.query.q as string | undefined;

  const courses = await prismaClient.course.findMany({
    where: {
      AND: [
        { creatorId: req.user.id },
        subject ? { subject: subject } : {},
        visibility ? { visibility: visibility } : {},
        searchQuery
          ? { name: { contains: searchQuery, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      min_grade: true,
      max_grade: true,
      subject: true,
      visibility: true,
      color: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json(courses);
};

export const getCourseContent = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  console.log(req.body);

  const content = await prismaClient.course.findFirst({
    where: { id: courseId },
    select: {
      content: true,
    },
  });

  res.json(content);
};

export const updatCourseContent = async (req: Request, res: Response) => {
  const { courseId, content } = req.body;
  const course = await prismaClient.course.findFirst({
    where: {
      id: courseId,
      creatorId: req.user.id,
    },
  });

  if (!course) {
    throw new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED);
  }

  const updatedCourse = await prismaClient.course.update({
    where: { id: courseId },
    data: { content },
  });

  res.json(updatedCourse);
};
