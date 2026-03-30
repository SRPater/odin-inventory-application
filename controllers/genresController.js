import * as db from '../db/genresQueries.js';

/**
 * Fetches all genres and renders the list view.
 */
export const getGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  
  res.render('genresList', {
    title: 'All Genres',
    genres,
  });
};

/**
 * Displays details for a single genre, including its associated games.
 */
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

/**
 * Renders the form for creating a new genre.
 * Passes 'genre: null' so the shared form knows to stay in 'Create' mode.
 */
export const createGenreGet = (req, res) => {
  res.render('genreForm', { title: 'Add New Genre', genre: null });
};

/**
 * Processes the creation of a new genre.
 */
export const createGenrePost = async (req, res) => {
  const { name } = req.body;
  const newGenreId = await db.createGenre(name);

  // Send user to the newly created genre's page to see the result
  res.redirect(`/genres/${newGenreId}`);
};

/**
 * Renders the edit form populated with existing genre data.
 */
export const updateGenreGet = async (req, res) => {
  const { id } = req.params;
  const genre = await db.getGenreById(id);

  if (!genre) {
    return res.status(404).send('Genre not found');
  }

  res.render('genreForm', { title: `Edit ${genre.name}`, genre });
};

/**
 * Updates an existing genre.
 */
export const updateGenrePost = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await db.updateGenre(id, name);

  // Send user back to the detail page to confirm the updates worked
  res.redirect(`/genres/${id}`);
};

/**
 * Deletes an existing genre.
 */
export const deleteGenre = async (req, res) => {
  const { id } = req.params;
  await db.deleteGenre(id);

  // Send user back to genres list to confirm the delete worked
  res.redirect('/genres');
};
