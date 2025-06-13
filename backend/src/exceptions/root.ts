//message, status, code, error codes

export class HttpException extends Error {
  message: string;
  errorCode: ErrorCodes;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCodes,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  COURSE_NOT_FOUND = 4002,
  USER_ALREADY_EXISTS = 1002,
  INCORECT_PASSWORD = 1003,
  UNPROCESSABLE_ENTITY = 20001,
  INTERNAL_EXCEPTION = 30001,
  UNAUTHORIZED = 1005,
  GROUP_NOT_FOUND,
  STUDENT_NOT_FOUND,
}
