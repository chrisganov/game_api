import { desc, eq } from "drizzle-orm";
import { users } from "../db/schema";
import { InsertUser } from "./users.validators";
import { db } from "../db";

// TODO
const getAllPublic = async () => {
  const allUsers = await db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
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

const createPublic = async (newUser: InsertUser) => {
  const [{ id: createdId }] = await db.insert(users).values(newUser).returning({ id: users.id });

  const addedUser = await db.query.users.findFirst({
    where: eq(users.id, createdId),
    with: {
      scores: true,
    },
  });

  return addedUser;
};

export const userRepo = {
  getAllPublic,
  createPublic,
};
