import pool from './pool.js';

/**
 * Retrieves all genres from the database, ordered alphabetically.
 */
export const getAllGenres = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM genres ORDER BY name ASC'
  );

  return rows;
};

/**
 * Fetches a single genre by ID along with its associated games.
 * Performs a separate query for the junction table to build a complete genre
 * object.
 */
export const getGenreById = async (id) => {
  const genreResult = await pool.query(
    'SELECT * FROM genres WHERE id = $1',
    [id],
  );

  const genre = genreResult.rows[0];
  if (!genre) return null;

  // Fetch associated games through the junction table
  const gamesResult = await pool.query(
    `SELECT games.* FROM games
     JOIN game_genres ON games.id = game_genres.game_id
     WHERE game_genres.genre_id = $1`,
    [id],
  );

  genre.games = gamesResult.rows;
  return genre;
};

/**
 * Creates a new genre record.
 */
export const createGenre = async (name) => {
  const { rows } = await pool.query(
    'INSERT INTO genres (name) VALUES ($1) RETURNING id',
    [name],
  );

  return rows[0].id;
};

/**
 * Updates a genre's details.
 */
export const updateGenre = async (id, name) => {
  await pool.query(
    'UPDATE genres SET name = $1 WHERE id = $2',
    [name, id],
  );
};
