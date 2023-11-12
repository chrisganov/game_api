import { userRepo } from "./users.repository";
import { InsertUser, multipleUsersValidation, userInsertValidation, userValidation } from "./users.validators";

export const getAllUsersService = async () => {
  try {
    const users = await userRepo.getAllPublic();

    const validUsers = multipleUsersValidation.safeParse(users);

    if (!validUsers.success) {
      throw new Error("Invalid Users");
    }

    return validUsers.data;
  } catch (e) {
    console.log(e);
    throw new Error("Get all users service");
  }
};

export const createUserService = async (newUser: InsertUser) => {
  try {
    const addedUser = await userRepo.createPublic(newUser);

    const validUsers = userValidation.safeParse(addedUser);

    if (!validUsers.success) {
      const error = validUsers.error;
      throw new Error("Invalid DB User");
    }

    return validUsers.data;
  } catch (e) {
    console.log(e);
    throw new Error("Create new user service");
  }
};
