import { db } from "../db";
import { scoresTable } from "../db/schema";

export type NewScore = typeof scoresTable.$inferInsert;

const create = async (userId: number, newScore: Pick<NewScore, "level" | "moves" | "time">) => {
  return await db
    .insert(scoresTable)
    .values({
      level: newScore.level,
      moves: newScore.moves,
      time: newScore.time,
      userId,
    })
    .returning();
};

export const scoresRepo = {
  create,
};
