import { NextFunction, Request, Response } from "express";
import { CustomError, formatAndSendError } from "../lib/error";
import { ERROR_MESSAGE } from "../constants";
import { verify } from "jsonwebtoken";
import { ENV } from "../lib/env";
import { getUserByIdService } from "../users/users.service";

interface TokenPayload {
  userId: number;
}

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const authToken = request.headers.authorization?.split(" ")[1];

    if (!authToken) {
      throw new CustomError({
        message: "Unauthorized",
        status: "unauthorized",
        errorMessage: ERROR_MESSAGE.general.unauthorized,
      });
    }

    verify(authToken, ENV.jsonToken, async (err, decodedData) => {
      // No other way to define type
      try {
        const tokenData = decodedData as TokenPayload;

        if (err) {
          throw new CustomError({
            message: `Token verify error: ${err.message}`,
            status: "unauthorized",
            errorMessage: ERROR_MESSAGE.general.unauthorized,
          });
        }

        const existingUser = await getUserByIdService(tokenData.userId);

        if (!existingUser) {
          throw new CustomError({
            message: `User with id: ${tokenData.userId} does not exist`,
            status: "unauthorized",
            errorMessage: ERROR_MESSAGE.general.unauthorized,
          });
        }

        response.locals = {
          user: existingUser,
        };

        next();
      } catch (e) {
        formatAndSendError(e, request, response);
      }
    });
  } catch (e) {
    formatAndSendError(e, request, response);
  }
};
