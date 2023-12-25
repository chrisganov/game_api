import { Response } from "express";
import { User } from "../users/users.validators";

export interface AuthenticatedData<T> {
  data: T;
  userId: number;
}

export type AuthenticatedResponse<ResponseBody = unknown> = Response<ResponseBody, { user: User }>;
