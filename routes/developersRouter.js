import { Router } from 'express';
import * as developersController from '../controllers/developersController.js';

const developersRouter = Router();

developersRouter.get('/', developersController.getDevelopers);
developersRouter.get('/new', developersController.createDeveloperGet);
developersRouter.post('/new', developersController.createDeveloperPost);
developersRouter.get('/:id', developersController.getDeveloper);

export default developersRouter;
