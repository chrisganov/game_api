import { Response, Request } from "express";
import { HTTP_STATUS } from "../constants";

interface Constructor {
  message: string;
  status: keyof typeof HTTP_STATUS;
  errorMessage: string;
}

export class CustomError {
  message: Constructor["message"];
  status: Constructor["status"];
  errorMessage: Constructor["errorMessage"];

  constructor({ message, status, errorMessage }: Constructor) {
    this.message = message;
    this.status = status;
    this.errorMessage = errorMessage;
  }
}

export const formatAndSendError = (e: unknown, req: Request, res: Response) => {
  req.log.error(e);

  if (e instanceof CustomError) {
    return res.status(HTTP_STATUS[e.status]).json({ message: e.errorMessage });
  }

  if (e instanceof Error) {
    return res.status(400).json({ message: e.message });
  }

  return res.status(404).json({ message: "unknown error" });
};
