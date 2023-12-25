import { AuthenticatedData } from "../@types/utils";
import { CustomError } from "../lib/error";
import { scoresRepo } from "./scores.repository";
import { InsertScore, scoreValidator } from "./scores.validators";

export const createScoreService = async ({ userId, data }: AuthenticatedData<InsertScore>) => {
  const [createdScore] = await scoresRepo.create(userId, {
    level: data.level,
    moves: data.moves,
    time: data.time,
  });

  const validData = scoreValidator.safeParse(createdScore);

  if (!validData.success) {
    const error = validData.error;
    debugger;
    throw new CustomError({
      errorMessage: "Invalid score data",
      message: "asd",
      status: "badRequest",
    });
  }

  return validData;
};
