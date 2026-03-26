import * as gamesDb from '../db/gamesQueries.js';
import * as devsDb from '../db/developersQueries.js';
import * as genresDb from '../db/genresQueries.js';

/**
 * Fetches all games and renders the list view.
 */
export const getGames = async (req, res) => {
  const games = await gamesDb.getAllGames();
  
  res.render('gamesList', {
    title: 'All Games',
    games,
  });
};

/**
 * Displays details for a single game, including its associated developers and
 * genres.
 */
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

/**
 * Renders the form for creating a new game.
 * Passes 'game: null' so the shared form knows to stay in 'Create' mode.
 */
export const createGameGet = async (req, res) => {
  const [developers, genres] = await Promise.all([
    devsDb.getAllDevelopers(),
    genresDb.getAllGenres(),
  ]);

  res.render('gameForm', {
    title: 'Add New Game',
    game: null,
    developers,
    genres,
  });
};

/**
 * Processes the creation of a new game and its junction table associations.
 */
export const createGamePost = async (req, res) => {
  const { name, developerIds, genreIds } = req.body;

  // Normalize form data: convert single strings or undefined into a clean array
  const devs = Array.isArray(developerIds)
    ? developerIds
    : [developerIds].filter(Boolean);
  
  const genres = Array.isArray(genreIds)
    ? genreIds
    : [genreIds].filter(Boolean);
  
  const newGameId = await gamesDb.createGame(name, devs, genres);

  // Send user to the newly created game's page to see the result
  res.redirect(`/games/${newGameId}`);
};

/**
 * Renders the edit form populated with existing game data.
 */
export const updateGameGet = async (req, res) => {
  const { id } = req.params;

  // Fetch all data in parallel to avoid "waterfall" loading times
  const [game, developers, genres] = await Promise.all([
    gamesDb.getGameById(id),
    devsDb.getAllDevelopers(),
    genresDb.getAllGenres(),
  ]);

  if (!game) {
    return res.status(404).send('Game not found');
  }

  res.render('gameForm', {
    title: `Edit ${game.name}`,
    game,
    developers,
    genres,
  });
};

/**
 * Updates an existing game and synchronizes its junction tables.
 */
export const updateGamePost = async (req, res) => {
  const { id } = req.params;
  const { name, developerIds, genreIds } = req.body;

  const devs = Array.isArray(developerIds)
    ? developerIds
    : [developerIds].filter(Boolean);
  
  const genres = Array.isArray(genreIds)
    ? genreIds
    : [genreIds].filter(Boolean);
  
  await gamesDb.updateGame(id, name, devs, genres);

  // Send user back to the detail page to confirm the updates worked
  res.redirect(`/games/${id}`);
};
