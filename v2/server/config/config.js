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

const local = {
  connectionString: DEV_URL,
};

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
