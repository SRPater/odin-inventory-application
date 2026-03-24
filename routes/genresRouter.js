import { Router } from 'express';
import * as genresController from '../controllers/genresController.js';

const genresRouter = Router();

genresRouter.get('/', genresController.getAllGenres);
genresRouter.get('/:id', genresController.getGenreById);

export default genresRouter;
