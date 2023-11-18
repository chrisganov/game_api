import { users } from "../db/schema";
import { InsertUser } from "./users.validators";
import { db } from "../db";

// TODO
const getAllPublic = async () => {
  const allUsers = await db.query.users.findMany({
    orderBy: (users, { desc }) => [desc(users.createdAt)],
    with: {
      scores: true,
    },
    columns: {
      id: true,
      username: true,
    },
  });

  return allUsers;
};

const getByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  return user;
};

const createPublic = async ({ password, ...rest }: InsertUser) => {
  const [{ id: createdId }] = await db
    .insert(users)
    .values({ ...rest, passhash: password })
    .returning({ id: users.id });

  const addedUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, createdId),
    with: {
      scores: true,
    },
  });

  return addedUser;
};

export const userRepo = {
  getAllPublic,
  createPublic,
  getByEmail,
};
