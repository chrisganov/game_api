import { Router, Response, Request } from "express";
import { createUserService, getAllUsersService } from "./users.service";
import { InsertUser, Users, userInsertValidation } from "./users.validators";
import { ERROR_MESSAGE, HTTP_STATUS } from "../constants";
import { CustomError, formatAndSendError } from "../lib/error";

const userRouter = Router();

userRouter.get("/", async (req, res: Response<Users>) => {
  try {
    const users = await getAllUsersService();

    return res.status(HTTP_STATUS.ok).send(users);
  } catch (e) {
    return formatAndSendError(e, req, res);
  }
});

userRouter.post("/", async (req: Request<unknown, unknown, InsertUser>, res) => {
  try {
    if (!req.body) {
      throw new CustomError({
        message: "Create user - no req body",
        status: "badRequest",
        errorMessage: ERROR_MESSAGE.general.invalidRequest,
      });
    }

    const validUserInput = userInsertValidation.safeParse(req.body);

    if (!validUserInput.success) {
      throw new CustomError({
        message: "Invalid user parse",
        status: "notFound",
        errorMessage: ERROR_MESSAGE.user.notFound,
      });
    }

    const newUser = await createUserService(validUserInput.data);

    return res.status(HTTP_STATUS.created).send(newUser);
  } catch (e) {
    return formatAndSendError(e, req as Request, res);
  }
});

export default userRouter;
