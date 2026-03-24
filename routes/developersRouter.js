import { Router } from 'express';
import * as developersController from '../controllers/developersController.js';

const developersRouter = Router();

developersRouter.get('/', developersController.getAllDevelopers);
developersRouter.get('/:id', developersController.getDeveloperById);

export default developersRouter;
