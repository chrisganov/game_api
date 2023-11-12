import { Router, Response, Request } from "express";
import { createUserService, getAllUsersService } from "./users.service";
import { InsertUser, Users, userInsertValidation } from "./users.validators";
import { HTTP_STATUS } from "../constants";

const userRouter = Router();

userRouter.get("/", async (req, res: Response<Users>) => {
  try {
    const users = await getAllUsersService();

    return res.status(HTTP_STATUS.ok).send(users);
  } catch (e) {
    console.log(e);
    throw new Error("Get All users controller");
  }
});

userRouter.post("/", async (req: Request<unknown, unknown, InsertUser>, res) => {
  try {
    if (!req.body) {
      throw new Error("No Body");
    }

    const validUserInput = userInsertValidation.safeParse(req.body);

    if (!validUserInput.success) {
      const error = validUserInput.error;
      throw new Error("Invalid User");
    }

    const newUser = await createUserService(validUserInput.data);

    return res.status(HTTP_STATUS.created).send(newUser);
  } catch (e) {
    console.log(e);
    throw new Error("Create User Controller");
  }
});

export default userRouter;
