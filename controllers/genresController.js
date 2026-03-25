import * as db from '../db/genresQueries.js';

export const getGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  
  res.render('genresList', {
    title: 'All Genres',
    genres,
  });
};

export const getGenre = async (req, res) => {
  const { id } = req.params;
  const genre = await db.getGenreById(id);

  if (!genre) {
    return res.status(404).send('Genre not found');
  }

  res.render('genreDetail', {
    title: 'Genre Detail',
    genre,
  });
};

export const createGenreGet = (req, res) => {
  res.render('createGenre', { title: 'Add New Genre' });
};

export const createGenrePost = async (req, res) => {
  const newGenreId = await db.createGenre(req.body.name);
  res.redirect(`/genres/${newGenreId}`);
};
