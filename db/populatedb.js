import { Client } from 'pg';
import 'dotenv/config';

const isProd = process.argv.includes('--prod');
const dbConfig = {
  user: isProd ? process.env.DB_USER_PROD : process.env.DB_USER_LOCAL,
  host: isProd ? process.env.DB_HOST_PROD : process.env.DB_HOST_LOCAL,
  database: isProd ? process.env.DB_NAME_PROD : process.env.DB_NAME_LOCAL,
  password: isProd ? process.env.DB_PASS_PROD : process.env.DB_PASS_LOCAL,
  port: isProd ? process.env.DB_PORT_PROD : process.env.DB_PORT_LOCAL,
  ssl: isProd ? { rejectUnauthorized: false } : false,
};

const SQL = `
CREATE TABLE IF NOT EXISTS developers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  release_date DATE
);

CREATE TABLE IF NOT EXISTS game_developers (
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  developer_id INTEGER REFERENCES developers(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, developer_id)
);

CREATE TABLE IF NOT EXISTS game_genres (
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, genre_id)
);

INSERT INTO developers (name) VALUES
  ('Sandfall Interactive'),
  ('Supergiant Games'),
  ('Ubisoft Montreal');

INSERT INTO genres (name) VALUES
  ('Action role-playing'),
  ('Action-adventure'),
  ('Hack and slash'),
  ('Roguelike'),
  ('Role-playing'),
  ('Stealth');

INSERT INTO games (name, release_date) VALUES
  ('Assassin''s Creed', '2007-11-13'),
  ('Clair Obscur: Expedition 33', '2025-04-24'),
  ('Hades', '2020-09-15');

INSERT INTO game_developers (game_id, developer_id) VALUES
  (1, 3),
  (2, 1),
  (3, 2);

INSERT INTO game_genres (game_id, genre_id) VALUES
  (1, 2),
  (1, 6),
  (2, 5),
  (3, 1),
  (3, 3),
  (3, 4);
`;

async function main() {
  console.log(`Seeding to ${isProd ? 'PRODUCTION' : 'LOCAL'}...`);

  const client = new Client(dbConfig);

  try {
    await client.connect();
    await client.query(SQL);
    console.log('Done');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await client.end();
  }
}

main();
