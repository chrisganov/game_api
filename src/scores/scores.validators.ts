import { USERNAME_REGEX } from "src/constants";
import { z } from "zod";

export const scoreValidator = z.object({
  id: z.number(),
  moves: z.number(),
  time: z.number(),
  level: z.enum(["EASY", "MEDIUM", "HARD"]),
});
