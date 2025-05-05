import { Router } from 'express';
import { MathController } from '../controllers/math.controller';

const router = Router();
const mathController = new MathController();

// Math Routes
router.get('/lcm', mathController.getLCM.bind(mathController));
router.get('/plusone', mathController.increment.bind(mathController));

export default router;
