import pg from 'pg';

const secret = process.env.SECRET;

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD || null,
  port: process.env.PGPORT,
};
const pool = new pg.Pool(config);

export default {
  secret,
  pool,
};
