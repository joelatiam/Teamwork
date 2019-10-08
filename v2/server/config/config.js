import pg from 'pg';

const secret = process.env.SECRET;

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD || null,
  port: process.env.PGPORT,
};
const pool = new pg.Pool(() => {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    };
  } return config;
});

export default {
  secret,
  pool,
};
