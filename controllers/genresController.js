import * as db from '../db/queries.js';

export const getAllGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render('genresList', {
    title: 'All Genres',
    genres,
  });
};

export const getGenreById = async (req, res) => {
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
