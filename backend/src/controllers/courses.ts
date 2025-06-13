import { Request, Response } from "express";
import { prismaClient } from "..";
import { CourseSchema } from "../schema/course";
import { PrismaClient, Subject, Visibility } from "@prisma/client";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import { BadRequestException } from "../exceptions/bad-request";
import { NotFoundException } from "../exceptions/not-found";

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

export const getPublicCourses = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const subject =
    (req.query.subject as string)?.toUpperCase() in Subject
      ? ((req.query.subject as string)?.toUpperCase() as Subject)
      : null;

  const searchQuery = req.query.q as string | undefined;

  const courses = await prismaClient.course.findMany({
    where: {
      AND: [
        subject ? { subject: subject } : {},
        { visibility: "PUBLIC" },
        searchQuery
          ? { name: { contains: searchQuery, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: 10 * page,
    take: 10,
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

export const getStudentCourses = async (req: Request, res: Response) => {
  const subject =
    (req.query.subject as string)?.toUpperCase() in Subject
      ? ((req.query.subject as string)?.toUpperCase() as Subject)
      : null;
  const searchQuery = req.query.q as string | undefined;
  const studentId = req.query.studentId as string | undefined;

  if (!studentId) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  const studentWithGroupsAndCourses = await prismaClient.user.findUnique({
    where: {
      id: studentId,
    },
    include: {
      studentGroups: {
        include: {
          courses: {
            where: {
              ...(subject && { subject }),
              ...(searchQuery && {
                name: {
                  contains: searchQuery,
                  mode: "insensitive",
                },
              }),
            },
          },
        },
      },
    },
  });

  if (!studentWithGroupsAndCourses) {
    return res.status(404).json({ error: "Student not found" });
  }

  const allCourses = studentWithGroupsAndCourses.studentGroups.flatMap(
    (group) => group.courses
  );

  res.json(allCourses);
};

export const getCourseContent = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  let userId = "";
  if (req.user) {
    let userId = req.user.id;
  }

  const course = await prismaClient.course.findFirst({
    where: {
      id: courseId,
      OR: [
        { visibility: "PUBLIC" },
        { creatorId: userId },
        {
          groups: {
            some: {
              students: {
                some: { id: userId },
              },
            },
          },
        },
      ],
    },
    select: {
      content: true,
    },
  });

  console.log(course);

  if (!course) {
    throw new UnauthorizedException(
      "You don't have access to this course content or it doesn't exist.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  return res.json(course.content);
};

export const getCourseById = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const course = await prismaClient.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      creatorId: true,
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

  if (!course) {
    throw new NotFoundException(
      "Course Not Found!",
      ErrorCodes.COURSE_NOT_FOUND
    );
  }

  if (course.creatorId !== req.user.id) {
    throw new BadRequestException(
      "User is not the creator.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  res.json(course);
};

export const updateCourseContent = async (req: Request, res: Response) => {
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

export const updateCourse = async (req: Request, res: Response) => {
  CourseSchema.parse(req.body);
  const { courseId } = req.params;
  const { name, color, min_grade, max_grade, subject, visibility } = req.body;
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
    data: { name, color, min_grade, max_grade, subject, visibility },
  });

  res.json(updatedCourse);
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { courseId } = req.body;

  const course = await prismaClient.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new NotFoundException(
      "Course Not Found!",
      ErrorCodes.COURSE_NOT_FOUND
    );
  }

  if (course.creatorId !== req.user.id) {
    throw new BadRequestException(
      "User is not the creator.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  await prismaClient.course.delete({
    where: { id: courseId },
  });

  res.json({ message: "Course deleted successfully!" });
};
