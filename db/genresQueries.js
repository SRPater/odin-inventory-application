import pool from './pool.js';

export const getAllGenres = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM genres ORDER BY name ASC'
  );

  return rows;
};

export const getGenreById = async (id) => {
  const genreResult = await pool.query(
    'SELECT * FROM genres WHERE id = $1',
    [id],
  );

  const genre = genreResult.rows[0];
  if (!genre) return null;

  const gamesResult = await pool.query(
    `SELECT games.* FROM games
     JOIN game_genres ON games.id = game_genres.game_id
     WHERE game_genres.genre_id = $1`,
    [id],
  );

  genre.games = gamesResult.rows;
  return genre;
};

export const createGenre = async (name) => {
  const { rows } = await pool.query(
    'INSERT INTO genres (name) VALUES ($1) RETURNING id',
    [name],
  );

  return rows[0].id;
};
