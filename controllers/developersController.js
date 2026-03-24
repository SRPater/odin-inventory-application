import * as db from '../db/queries.js';

export const getAllDevelopers = async (req, res) => {
  const developers = await db.getAllDevelopers();
  res.render('developersList', {
    title: 'All Developers',
    developers,
  });
};

export const getDeveloperById = async (req, res) => {
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
