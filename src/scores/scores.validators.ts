import { z } from "zod";
import { levelEnum } from "../db/schema";

export const scoreValidator = z.object({
  id: z.number(),
  moves: z.number(),
  time: z.number(),
  level: z.enum(levelEnum.enumValues),
  createdAt: z.string().datetime(),
});

export const insertScoreValidator = scoreValidator.pick({ level: true, moves: true, time: true });

export type Score = z.infer<typeof scoreValidator>;
export type InsertScore = z.infer<typeof insertScoreValidator>;
