import { Router } from "express";
import jokeRoutes from './joke.routes';
import mathRoutes from './math.routes';

const router = Router();

router.use('/jokes', jokeRoutes)
router.use('/math', mathRoutes);

export default router;