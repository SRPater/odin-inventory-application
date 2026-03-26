import pool from './pool.js';

/**
 * Retrieves all developers from the database, ordered alphabetically.
 */
export const getAllDevelopers = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM developers ORDER BY name ASC'
  );

  return rows;
};

/**
 * Fetches a single developer by ID along with its associated games.
 * Performs a separate query for the junction table to build a complete
 * developer object.
 */
export const getDeveloperById = async (id) => {
  const devResult = await pool.query(
    'SELECT * FROM developers WHERE id = $1',
    [id],
  );

  const developer = devResult.rows[0];
  if (!developer) return null;

  // Fetch associated games through the junction table
  const gamesResult = await pool.query(
    `SELECT games.* FROM games
     JOIN game_developers ON games.id = game_developers.game_id
     WHERE game_developers.developer_id = $1`,
    [id],
  );

  developer.games = gamesResult.rows;
  return developer;
};

/**
 * Creates a new developer record.
 */
export const createDeveloper = async (name) => {
  const { rows } = await pool.query(
    'INSERT INTO developers (name) VALUES ($1) RETURNING id',
    [name],
  );

  return rows[0].id;
};

/**
 * Updates a developer's details.
 */
export const updateDeveloper = async (id, name) => {
  await pool.query(
    'UPDATE developers SET name = $1 WHERE id = $2',
    [name, id],
  );
};
