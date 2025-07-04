import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      console.error(error);
      let exceptions: HttpException;
      if (error instanceof HttpException) {
        exceptions = error;
      } else {
        exceptions = new InternalException(
          "Something went wrong!",
          error,
          ErrorCodes.INTERNAL_EXCEPTION
        );
      }
      next(exceptions);
    }
  };
};
