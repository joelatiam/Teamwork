import pg from 'pg';

const secret = process.env.SECRET;

const pool = new pg.Pool({
  user: process.env.PGHOST,
  host: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

export default {
  secret,
  pool,
};
