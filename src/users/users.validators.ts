import { z } from "zod";
import { scoreValidator } from "../scores/scores.validators";
import { PASSWORD_REGEX, USERNAME_REGEX } from "../constants";

export const userValidation = z.object({
  id: z.number(),
  username: z.string(),
  scores: z.array(scoreValidator),
});

export const multipleUsersValidation = z.array(userValidation);

export const userInsertValidation = z.object({
  username: z.string().trim().regex(USERNAME_REGEX),
  email: z.string().trim().min(1, "Email needs to exist").email("Not a valid email"),
  password: z.string().regex(PASSWORD_REGEX, "Invalid password"),
});

export const userLoginValidation = userInsertValidation.pick({ username: true, password: true });

export type User = z.infer<typeof userValidation>;
export type Users = z.infer<typeof multipleUsersValidation>;
export type InsertUser = z.infer<typeof userInsertValidation>;
export type UserLogin = z.infer<typeof userLoginValidation>;
