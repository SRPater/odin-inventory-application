import { Router } from 'express';
import * as gamesController from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.get('/', gamesController.getAllGames);
gamesRouter.get('/games/:id', gamesController.getGameById);

export default gamesRouter;
