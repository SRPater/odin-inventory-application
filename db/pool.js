import { Pool } from 'pg';

export default new Pool({
  host: process.env.DB_HOST_LOCAL,
  user: process.env.DB_USER_LOCAL,
  database: process.env.DB_NAME_LOCAL,
  password: process.env.DB_PASS_LOCAL,
  port: parseInt(process.env.DB_PORT_LOCAL, 10) || 5432
});
