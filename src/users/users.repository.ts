import { desc, eq } from "drizzle-orm";
import { db } from "src/db";
import { users } from "../db/schema";
import { InsertUser } from "./users.validators";

// TODO
const getAllPublic = async () => {
  try {
    const allUsers = await db.query.users.findMany({
      orderBy: [desc(users.createdAt)],
      columns: {
        id: true,
        username: true,
      },
    });

    return allUsers;
  } catch (e) {
    console.log(e);
    throw new Error("Get all Repo Error");
  }
};

const createPublic = async (newUser: InsertUser) => {
  try {
    const [{ id: createdId }] = await db.insert(users).values(newUser).returning({ id: users.id });

    const addedUser = await db.query.users.findFirst({
      where: eq(users.id, createdId),
      with: {
        scores: true,
      },
    });

    return addedUser;
  } catch (e) {
    console.log(e);
    throw new Error("Create user Repo");
  }
};

export const userRepo = {
  getAllPublic,
  createPublic,
};
