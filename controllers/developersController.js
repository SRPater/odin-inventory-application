import * as db from '../db/developersQueries.js';

/**
 * Fetches all developers and renders the list view.
 */
export const getDevelopers = async (req, res) => {
  const developers = await db.getAllDevelopers();
  
  res.render('developersList', {
    title: 'All Developers',
    developers,
  });
};

/**
 * Displays details for a single developer, including its associated games.
 */
export const getDeveloper = async (req, res) => {
  const { id } = req.params;
  const developer = await db.getDeveloperById(id);

  if (!developer) {
    return res.status(404).send('Developer not found');
  }

  res.render('developerDetail', {
    title: 'Developer Detail',
    developer,
  });
};

/**
 * Renders the form for creating a new developer.
 * Passes 'developer: null' so the shared form knows to stay in 'Create' mode.
 */
export const createDeveloperGet = (req, res) => {
  res.render('developerForm', { title: 'Add New Developer', developer: null });
};

/**
 * Processes the creation of a new developer.
 */
export const createDeveloperPost = async (req, res) => {
  const { name } = req.body;
  const newDevId = await db.createDeveloper(name);
  
  // Send user to the newly created developer's page to see the result
  res.redirect(`/developers/${newDevId}`);
};

/**
 * Renders the edit form populated with existing developer data.
 */
export const updateDeveloperGet = async (req, res) => {
  const { id } = req.params;
  const developer = await db.getDeveloperById(id);

  if (!developer) {
    return res.status(404).send('Developer not found');
  }

  res.render('developerForm', { title: `Edit ${developer.name}`, developer });
};

/**
 * Updates an existing developer.
 */
export const updateDeveloperPost = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  await db.updateDeveloper(id, name);

  // Send user back to the detail page to confirm the updates worked
  res.redirect(`/developers/${id}`);
};
