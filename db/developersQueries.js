import pool from './pool.js';

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
     WHERE game_developers.developer_id = $1`,
    [id],
  );

  developer.games = gamesResult.rows;
  return developer;
};

export const createDeveloper = async (name) => {
  const { rows } = await pool.query(
    'INSERT INTO developers (name) VALUES ($1) RETURNING id',
    [name],
  );

  return rows[0].id;
};
