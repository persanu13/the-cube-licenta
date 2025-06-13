import { Request, Response } from "express";
import { prismaClient } from "..";
import { GroupSchema } from "../schema/group";
import { NotFoundException } from "../exceptions/not-found";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";

export const createGroup = async (req: Request, res: Response) => {
  GroupSchema.parse(req.body);
  const { name, color } = req.body;

  const group = await prismaClient.group.create({
    data: {
      name,
      color: color,
      teacherId: req.user.id,
    },
  });

  res.json(group);
};

export const getTeachersGroups = async (req: Request, res: Response) => {
  const searchQuery = req.query.q as string | undefined;

  const groups = await prismaClient.group.findMany({
    where: {
      AND: [
        { teacherId: req.user.id },
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
      color: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json(groups);
};

export const getGroupById = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const group = await prismaClient.group.findUnique({
    where: { id: groupId },
    select: {
      id: true,
      name: true,
      color: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!group) {
    throw new NotFoundException("Group Not Found!", ErrorCodes.GROUP_NOT_FOUND);
  }

  const isOwner = await prismaClient.group.findFirst({
    where: {
      id: groupId,
      teacherId: req.user.id,
    },
  });

  if (!isOwner) {
    throw new UnauthorizedException(
      "User is not the teacher of this group.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  res.json(group);
};

export const getGroupStudents = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const group = await prismaClient.group.findUnique({
    where: { id: groupId },
    include: {
      students: true,
    },
  });

  if (!group) {
    throw new NotFoundException("Group Not Found!", ErrorCodes.GROUP_NOT_FOUND);
  }

  if (group.teacherId !== req.user.id) {
    throw new UnauthorizedException(
      "User is not the teacher of this group.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  res.json(group.students);
};

export const getGroupCourses = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  const group = await prismaClient.group.findUnique({
    where: { id: groupId },
    include: {
      courses: true,
    },
  });

  if (!group) {
    throw new NotFoundException("Group Not Found!", ErrorCodes.GROUP_NOT_FOUND);
  }

  if (group.teacherId !== req.user.id) {
    throw new UnauthorizedException(
      "User is not the teacher of this group.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  res.json(group.courses);
};

export const deleteGroup = async (req: Request, res: Response) => {
  const { groupId } = req.body;

  const group = await prismaClient.group.findUnique({
    where: { id: groupId },
  });

  if (!group) {
    throw new NotFoundException("Group Not Found!", ErrorCodes.GROUP_NOT_FOUND);
  }

  if (group.teacherId !== req.user.id) {
    throw new UnauthorizedException(
      "User is not the teacher of this group.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  await prismaClient.group.delete({
    where: { id: groupId },
  });

  res.json({ message: "Group deleted successfully!" });
};

export const updateGroup = async (req: Request, res: Response) => {
  GroupSchema.parse(req.body);
  const { groupId } = req.params;
  const { name, color } = req.body;

  console.log(groupId);

  const group = await prismaClient.group.findUnique({
    where: { id: groupId },
  });

  if (!group) {
    throw new NotFoundException("Group Not Found!", ErrorCodes.GROUP_NOT_FOUND);
  }

  if (group.teacherId !== req.user.id) {
    throw new UnauthorizedException(
      "User is not the teacher of this group.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  const updatedGroup = await prismaClient.group.update({
    where: { id: groupId },
    data: {
      name,
      color,
    },
  });

  res.json(updatedGroup);
};

export const addCourseToGroup = async (req: Request, res: Response) => {
  const { groupId, courseId } = req.body;

  if (!courseId) {
    throw new NotFoundException(
      "Course Not Found!",
      ErrorCodes.COURSE_NOT_FOUND
    );
  }

  const group = await prismaClient.group.findUnique({
    where: { id: groupId },
    include: { courses: true },
  });

  if (!group) {
    throw new NotFoundException("Group Not Found!", ErrorCodes.GROUP_NOT_FOUND);
  }

  if (group.teacherId !== req.user.id) {
    throw new UnauthorizedException(
      "User is not the teacher of this group.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  const updatedGroup = await prismaClient.group.update({
    where: { id: groupId },
    data: {
      courses: {
        connect: { id: courseId },
      },
    },
    include: {
      courses: true,
    },
  });

  res.json(updatedGroup);
};

export const addStudentToGroup = async (req: Request, res: Response) => {
  const { groupId, studentId } = req.body;

  if (!studentId) {
    throw new NotFoundException(
      "Student Not Found!",
      ErrorCodes.STUDENT_NOT_FOUND
    );
  }

  const group = await prismaClient.group.findUnique({
    where: { id: groupId },
    include: { students: true },
  });

  if (!group) {
    throw new NotFoundException("Group Not Found!", ErrorCodes.GROUP_NOT_FOUND);
  }

  if (group.teacherId !== req.user.id) {
    throw new UnauthorizedException(
      "User is not the teacher of this group.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  const updatedGroup = await prismaClient.group.update({
    where: { id: groupId },
    data: {
      students: {
        connect: { id: studentId },
      },
    },
    include: {
      students: true,
    },
  });

  res.json(updatedGroup);
};

export const removeCourseFromGroup = async (req: Request, res: Response) => {
  const { groupId, courseId } = req.body;

  if (!courseId) {
    throw new NotFoundException(
      "Course Not Found!",
      ErrorCodes.COURSE_NOT_FOUND
    );
  }

  const group = await prismaClient.group.findUnique({
    where: { id: groupId },
    include: { courses: true },
  });

  if (!group) {
    throw new NotFoundException("Group Not Found!", ErrorCodes.GROUP_NOT_FOUND);
  }

  if (group.teacherId !== req.user.id) {
    throw new UnauthorizedException(
      "User is not the teacher of this group.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  const updatedGroup = await prismaClient.group.update({
    where: { id: groupId },
    data: {
      courses: {
        disconnect: { id: courseId },
      },
    },
    include: {
      courses: true,
    },
  });

  res.json(updatedGroup);
};

export const removeStudentFromGroup = async (req: Request, res: Response) => {
  const { groupId, studentId } = req.body;

  if (!studentId) {
    throw new NotFoundException(
      "Student Not Found!",
      ErrorCodes.STUDENT_NOT_FOUND
    );
  }

  const group = await prismaClient.group.findUnique({
    where: { id: groupId },
    include: { students: true },
  });

  if (!group) {
    throw new NotFoundException("Group Not Found!", ErrorCodes.GROUP_NOT_FOUND);
  }

  if (group.teacherId !== req.user.id) {
    throw new UnauthorizedException(
      "User is not the teacher of this group.",
      ErrorCodes.UNAUTHORIZED
    );
  }

  const updatedGroup = await prismaClient.group.update({
    where: { id: groupId },
    data: {
      students: {
        disconnect: { id: studentId },
      },
    },
    include: {
      students: true,
    },
  });

  res.json(updatedGroup);
};
