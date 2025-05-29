import { Request, Response } from "express";
import { prismaClient } from "..";

export const createLeasson = async (req: Request, res: Response) => {
  const lesson = await prismaClient.lesson.create({
    data: {
      ...req.body,
    },
  });

  res.json(lesson);
};
