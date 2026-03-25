import { Router } from 'express';
import * as gamesController from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.get('/', gamesController.getGames);
gamesRouter.get('/games/new', gamesController.createGameGet);
gamesRouter.post('/games/new', gamesController.createGamePost);
gamesRouter.get('/games/:id', gamesController.getGame);

export default gamesRouter;
