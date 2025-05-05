import { Router } from 'express';
import { JokeController } from '../controllers/joke.controller';

const router = Router();
const jokeController = new JokeController();
// Joke Routes
router.get('/joke/:type', jokeController.getJoke.bind(jokeController));
router.get('/joke', jokeController.getJoke.bind(jokeController));
router.post('/joke', jokeController.saveJoke.bind(jokeController));
router.put('/joke/:id', jokeController.updateJoke.bind(jokeController));
router.delete('/joke/:id', jokeController.deleteJoke.bind(jokeController));

export default router;
