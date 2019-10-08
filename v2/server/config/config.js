import pg from 'pg';

const secret = '45erkjherht45495783';

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'teamwork',
  password: 'justdance',
  port: 5432,
});

export default {
  secret,
  pool,
};
