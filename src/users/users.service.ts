import { sign } from "jsonwebtoken";
import { ERROR_MESSAGE } from "../constants";
import { CustomError } from "../lib/error";
import { userRepo } from "./users.repository";
import { InsertUser, UserLogin, multipleUsersValidation, userValidation } from "./users.validators";
import { hash, verify } from "argon2";
import { ENV } from "../lib/env";
import { z } from "zod";

export const getAllUsersService = async () => {
  const users = await userRepo.getAllPublic();

  const validUsers = multipleUsersValidation.safeParse(users);

  if (!validUsers.success) {
    const error = validUsers.error;
    debugger;
    throw new CustomError({
      message: "Create db user validation failed",
      status: "badRequest",
      errorMessage: ERROR_MESSAGE.general.invalidRequest,
    });
  }

  return validUsers.data;
};

export const createUserService = async (newUser: InsertUser) => {
  const existingUser = await userRepo.getByEmail(newUser.email);

  if (existingUser) {
    throw new CustomError({
      message: `user with ${newUser.email} already exists`,
      status: "badRequest",
      errorMessage: ERROR_MESSAGE.user.alreadyExist,
    });
  }

  const password = await hash(newUser.password);

  const addedUser = await userRepo.createPublic({ ...newUser, password });

  const validUser = userValidation.safeParse(addedUser);

  if (!validUser.success) {
    throw new CustomError({
      message: "Create db user validation failed",
      status: "badRequest",
      errorMessage: ERROR_MESSAGE.general.invalidRequest,
    });
  }

  const token = sign({ userId: validUser.data.id }, ENV.jsonToken);

  return token;
};

export const getUserByIdService = async (id: number) => {
  const user = await userRepo.getById(id);

  if (!user) {
    throw new CustomError({
      message: "User does not exist",
      status: "notFound",
      errorMessage: ERROR_MESSAGE.user.notFound,
    });
  }

  return user;
};

export const loginUserService = async (login: UserLogin) => {
  const user = await userRepo.getByEmail(login.username);

  if (!user) {
    throw new CustomError({
      message: `User with ${login.username} does not exist`,
      status: "unauthorized",
      errorMessage: ERROR_MESSAGE.general.unauthorized,
    });
  }

  const isValidPassword = await verify(user.passhash, login.password);

  if (!isValidPassword) {
    throw new CustomError({
      message: "Password verification match failed",
      status: "unauthorized",
      errorMessage: ERROR_MESSAGE.general.unauthorized,
    });
  }

  const token = sign({ userId: user.id }, ENV.jsonToken);

  return token;
};
