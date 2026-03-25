import pool from './pool.js';

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

  const devsResult = await pool.query(
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

  game.developers = devsResult.rows;
  game.genres = genresResult.rows;

  return game;
};

export const createGame = async(name, developerIds, genreIds) => {
  const { rows } = await pool.query(
    'INSERT INTO games (name) VALUES ($1) RETURNING id',
    [name]
  );

  const gameId = rows[0].id;

  if (developerIds?.length) {
    for (const devId of developerIds) {
      await pool.query(
        'INSERT INTO game_developers (game_id, developer_id) VALUES ($1, $2)',
        [gameId, devId],
      );
    }
  }

  if (genreIds?.length) {
    for (const genreId of genreIds) {
      await pool.query(
        'INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)',
        [gameId, genreId],
      );
    }
  }

  return gameId;
};
