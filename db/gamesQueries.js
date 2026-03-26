import pool from './pool.js';

/**
 * Retrieves all games from the database, ordered alphabetically.
 */
export const getAllGames = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM games ORDER BY name ASC'
  );

  return rows;
};

/**
 * Fetches a single game by ID along with its associated developers and genres.
 * Performs separate queries for the junction tables to build a complete game
 * object.
 */
export const getGameById = async (id) => {
  const gameResult = await pool.query(
    'SELECT * FROM games WHERE id = $1',
    [id],
  );

  const game = gameResult.rows[0];
  if (!game) return null;

  // Fetch associated developers through the junction table
  const devsResult = await pool.query(
    `SELECT developers.* FROM developers
     JOIN game_developers ON developers.id = game_developers.developer_id
     WHERE game_developers.game_id = $1`,
    [id],
  );

  // Fetch associated genres through the junction table
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

/**
 * Creates a new game record and inserts its many-to-many relationships.
 */
export const createGame = async(name, releaseDate, developerIds, genreIds) => {
  const { rows } = await pool.query(
    'INSERT INTO games (name, release_date) VALUES ($1, $2) RETURNING id',
    [name, releaseDate]
  );

  const gameId = rows[0].id;

  // Insert developer associations if any were selected
  if (developerIds?.length) {
    for (const devId of developerIds) {
      await pool.query(
        'INSERT INTO game_developers (game_id, developer_id) VALUES ($1, $2)',
        [gameId, devId],
      );
    }
  }

  // Insert genre associations if any were selected
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

/**
 * Updates a game's details and synchronizes junction tables.
 * Uses a "Delete-and-Insert" pattern to update associations.
 */
export const updateGame = async(
  id,
  name,
  releaseDate,
  developerIds,
  genreIds
) => {
  await pool.query(
    'UPDATE games SET name = $1, release_date = $2 WHERE id = $3',
    [name, releaseDate, id],
  );

  // Sync Developers: Remove all current associations and re-add from the
  //                  updated list
  await pool.query('DELETE FROM game_developers WHERE game_id = $1', [id]);

  if (developerIds?.length) {
    for (const devId of developerIds) {
      await pool.query(
        'INSERT INTO game_developers (game_id, developer_id) VALUES ($1, $2)',
        [id, devId],
      );
    }
  }

  // Sync Genres: Remove all current associations and re-add from the updated
  //              list
  await pool.query('DELETE FROM game_genres WHERE game_id = $1', [id]);

  if (genreIds?.length) {
    for (const genreId of genreIds) {
      await pool.query(
        'INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)',
        [id, genreId],
      );
    }
  }
};
