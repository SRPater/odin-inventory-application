import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import gamesRouter from './routes/gamesRouter.js';
import developersRouter from './routes/developersRouter.js';
import genresRouter from './routes/genresRouter.js';

const app = express();

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', gamesRouter);
app.use('/developers', developersRouter);
app.use('/genres', genresRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Inventory App listening on port ${PORT}!`);
});
