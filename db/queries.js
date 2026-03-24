import pool from 'pool.js';

export const getAllGames = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM games ORDER BY name ASC'
  );

  return rows;
};

export const getGameById = async (id) => {
  const gameResult = await pool.query(
    'SELECT * FROM games WHERE id = $1',
    [id],
  );

  const game = gameResult.rows[0];

  if (!game) return null;

  const devResult = await pool.query(
    `SELECT developers.* FROM developers
     JOIN game_developers ON developers.id = game_developers.developer_id
     WHERE game_developers.game_id = $1`,
    [id],
  );

  const genresResult = await pool.query(
    `SELECT genres.* FROM genres
     JOIN game_genres ON genres.id = game_genres.genre_id
     WHERE game_genres.game_id = $1`,
    [id],
  );

  game.developers = devResult.rows;
  game.genres = genresResult.rows;

  return game;
};

export const getAllDevelopers = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM developers ORDER BY name ASC'
  );

  return rows;
};

export const getDeveloperById = async (id) => {
  const devResult = await pool.query(
    'SELECT * FROM developers WHERE id = $1',
    [id],
  );

  const developer = devResult.rows[0];

  if (!developer) return null;

  const gamesResult = await pool.query(
    `SELECT games.* FROM games
     JOIN game_developers ON games.id = game_developers.game_id
     WHERE game_developers.game_id = $1`,
    [id],
  );

  developer.games = gamesResult.rows;
  return developer;
};

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
