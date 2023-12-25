import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { createScoreService } from "./scores.service";
import { AuthenticatedResponse } from "../@types/utils";
import { insertScoreValidator } from "./scores.validators";
import { CustomError, formatAndSendError } from "../lib/error";
import { HTTP_STATUS } from "../constants";

const router = Router();

router.post("/", authMiddleware, async (req, res: AuthenticatedResponse) => {
  try {
    const validateRequest = insertScoreValidator.safeParse(req.body);

    if (!validateRequest.success) {
      throw new CustomError({
        message: "Invalid Data",
        errorMessage: `Invalid Data: ${req.body}`,
        status: "badRequest",
      });
    }

    const newScore = await createScoreService({ data: validateRequest.data, userId: res.locals.user.id });

    return res.status(HTTP_STATUS.created).json(newScore);
  } catch (e) {
    return formatAndSendError(e, req, res);
  }
});

export default router;
