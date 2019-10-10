import pg from 'pg';
import dotenv from 'dotenv';

const secret = process.env.SECRET;

dotenv.config();

let DEV_URL;
if (process.env.NODE_ENV === 'test') {
  DEV_URL = process.env.DATABASE_TEST;
} else {
  DEV_URL = process.env.DEV_URL;
}

let local = {
  connectionString: DEV_URL,
};

if (!process.env.NODE_ENV) {
  local = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD || null,
    port: process.env.PGPORT,
  };
}

const heroku = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
};

const connect = process.env.DATABASE_URL ? heroku : local;


const pool = new pg.Pool(connect);

export default {
  secret,
  pool,
};
