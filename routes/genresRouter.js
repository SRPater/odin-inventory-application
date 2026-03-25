import { Router } from 'express';
import * as genresController from '../controllers/genresController.js';

const genresRouter = Router();

genresRouter.get('/', genresController.getGenres);
genresRouter.get('/new', genresController.createGenreGet);
genresRouter.post('/new', genresController.createGenrePost);
genresRouter.get('/:id', genresController.getGenre);

export default genresRouter;
