import * as db from '../db/developersQueries.js';

export const getDevelopers = async (req, res) => {
  const developers = await db.getAllDevelopers();
  
  res.render('developersList', {
    title: 'All Developers',
    developers,
  });
};

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

export const createDeveloperGet = (req, res) => {
  res.render('createDeveloper', { title: 'Add New Developer' });
};

export const createDeveloperPost = async (req, res) => {
  const newDevId = await db.createDeveloper(req.body.name);
  res.redirect(`/developers/${newDevId}`);
};
