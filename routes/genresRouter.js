import { Router } from 'express';
import * as genresController from '../controllers/genresController.js';

const genresRouter = Router();

genresRouter.get('/', genresController.getGenres);

genresRouter.get('/new', genresController.createGenreGet);
genresRouter.post('/new', genresController.createGenrePost);

genresRouter.get('/:id/edit', genresController.updateGenreGet);
genresRouter.post('/:id/edit', genresController.updateGenrePost);

genresRouter.post('/:id/delete', genresController.deleteGenre);

genresRouter.get('/:id', genresController.getGenre);

export default genresRouter;
