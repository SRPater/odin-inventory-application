import * as db from '../db/queries.js';

export const getAllGames = async (req, res) => {
  const games = await db.getAllGames();
  res.render('gamesList', {
    title: 'All Games',
    games,
  });
};

export const getGameById = async (req, res) => {
  const { id } = req.params;
  const game = await db.getGameById(id);

  if (!game) {
    return res.status(404).send('Game not found');
  }

  res.render('gameDetail', {
    title: 'Game Detail',
    game,
  });
};
