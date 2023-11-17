import { ERROR_MESSAGE } from "../constants";
import { CustomError } from "../lib/error";
import { userRepo } from "./users.repository";
import { InsertUser, multipleUsersValidation, userValidation } from "./users.validators";

export const getAllUsersService = async () => {
  const users = await userRepo.getAllPublic();

  const validUsers = multipleUsersValidation.safeParse(users);

  if (!validUsers.success) {
    throw new CustomError({
      message: "Create db user validation failed",
      status: "badRequest",
      errorMessage: ERROR_MESSAGE.general.invalidRequest,
    });
  }

  return validUsers.data;
};

export const createUserService = async (newUser: InsertUser) => {
  const addedUser = await userRepo.createPublic(newUser);

  const validUsers = userValidation.safeParse(addedUser);

  if (!validUsers.success) {
    throw new CustomError({
      message: "Create db user validation failed",
      status: "badRequest",
      errorMessage: ERROR_MESSAGE.general.invalidRequest,
    });
  }

  return validUsers.data;
};
