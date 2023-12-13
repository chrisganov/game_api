import { usersTable } from "../db/schema";
import { InsertUser } from "./users.validators";
import { db } from "../db";
import { InferSelectModel } from "drizzle-orm";

type UserInferSelect = InferSelectModel<typeof usersTable>;
type UserSelect = Partial<Record<keyof UserInferSelect, boolean>>;

// TODO:
const getAllPublic = async () => {
  const allUsers = await db.query.usersTable.findMany({
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
  const user = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  return user;
};

const createPublic = async ({ password, ...rest }: InsertUser) => {
  const [{ id: createdId }] = await db
    .insert(usersTable)
    .values({ ...rest, passhash: password })
    .returning({ id: usersTable.id });

  const addedUser = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.id, createdId),
    with: {
      scores: true,
    },
  });

  return addedUser;
};

const getById = async (id: number) => {
  const user = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.id, id),
    with: {
      scores: true,
    },
  });

  return user;
};

export const userRepo = {
  getAllPublic,
  getById,
  createPublic,
  getByEmail,
};
