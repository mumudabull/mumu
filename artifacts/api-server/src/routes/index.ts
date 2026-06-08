import { Router, type IRouter } from "express";
import healthRouter from "./health";
import migrationRouter from "./migration";

const router: IRouter = Router();

router.use(healthRouter);
router.use(migrationRouter);

export default router;
