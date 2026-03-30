import { Router } from 'express';
import * as developersController from '../controllers/developersController.js';

const developersRouter = Router();

developersRouter.get('/', developersController.getDevelopers);

developersRouter.get('/new', developersController.createDeveloperGet);
developersRouter.post('/new', developersController.createDeveloperPost);

developersRouter.get('/:id/edit', developersController.updateDeveloperGet);
developersRouter.post('/:id/edit', developersController.updateDeveloperPost);

developersRouter.post('/:id/delete', developersController.deleteDeveloper);

developersRouter.get('/:id', developersController.getDeveloper);

export default developersRouter;
