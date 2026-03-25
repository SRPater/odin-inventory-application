import * as gamesDb from '../db/gamesQueries.js';
import * as devsDb from '../db/developersQueries.js';
import * as genresDb from '../db/genresQueries.js';

export const getGames = async (req, res) => {
  const games = await gamesDb.getAllGames();
  
  res.render('gamesList', {
    title: 'All Games',
    games,
  });
};

export const getGame = async (req, res) => {
  const { id } = req.params;
  const game = await gamesDb.getGameById(id);

  if (!game) {
    return res.status(404).send('Game not found');
  }

  res.render('gameDetail', {
    title: 'Game Detail',
    game,
  });
};

export const createGameGet = async (req, res) => {
  const [developers, genres] = await Promise.all([
    devsDb.getAllDevelopers(),
    genresDb.getAllGenres(),
  ]);

  res.render('createGame', {
    title: 'Add New Game',
    developers,
    genres,
  });
};

export const createGamePost = async (req, res) => {
  const { name, developerIds, genreIds } = req.body;

  const devs = Array.isArray(developerIds)
    ? developerIds
    : [developerIds].filter(Boolean);
  
  const genres = Array.isArray(genreIds)
    ? genreIds
    : [genreIds].filter(Boolean);
  
  const newGameId = await gamesDb.createGame(name, devs, genres);

  res.redirect(`/games/${newGameId}`);
};
