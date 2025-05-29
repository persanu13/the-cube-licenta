import { ErrorCodes, HttpException } from "./root";

export class UnproccessableEntity extends HttpException {
  constructor(messsage: string, errorCode: ErrorCodes, error: any) {
    super(messsage, errorCode, 422, error);
  }
}
