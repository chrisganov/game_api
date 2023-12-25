import { Router } from "express";
import userRouter from "./users/users.controller";
import scoreRouter from "./scores/scores.controller";

const router = Router();

router.use("/users", userRouter);
router.use("/scores", scoreRouter);

export default router;
