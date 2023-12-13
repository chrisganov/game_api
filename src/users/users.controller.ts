import { Router, Response, Request } from "express";
import { createUserService, getAllUsersService, loginUserService } from "./users.service";
import { InsertUser, Users, userInsertValidation, userLoginValidation } from "./users.validators";
import { ERROR_MESSAGE, HTTP_STATUS } from "../constants";
import { CustomError, formatAndSendError } from "../lib/error";
import { authMiddleware } from "../middlewares/auth";

const userRouter = Router();

userRouter.get("/", authMiddleware, async (req: Request, res: Response<Users>) => {
  try {
    const users = await getAllUsersService();

    return res.status(HTTP_STATUS.ok).send(users);
  } catch (e) {
    return formatAndSendError(e, req, res);
  }
});

userRouter.post("/login", async (req: Request<{ username: string; password: string }>, res: Response) => {
  try {
    const validRequestData = userLoginValidation.safeParse(req.body);

    if (!validRequestData.success) {
      throw new CustomError({
        message: "Invalid request body",
        status: "unauthorized",
        errorMessage: ERROR_MESSAGE.general.unauthorized,
      });
    }

    const loginToken = await loginUserService(validRequestData.data);

    res.status(200).send(loginToken);
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
