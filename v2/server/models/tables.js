import config from '../config/config';

const users = `CREATE TABLE IF NOT EXISTS users
(	
	id serial PRIMARY KEY NOT NULL ,
    firstname varchar NOT NULL,
    lastname varchar NOT NULL,
    gender varchar NOT NULL,
    email varchar NOT NULL,
    password varchar NOT NULL,
    jobRole varchar,
	department varchar,
    address varchar NOT NULL,
    isadmin boolean NOT NULL,
    joined timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);`;

const articles = `CREATE TABLE IF NOT EXISTS articles
(
    id serial PRIMARY KEY NOT NULL,
    title character varying,
    category character varying,
    article text NOT NULL,
    author integer NOT NULL,
    created time without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastupdate timestamp with time zone,
    CONSTRAINT author FOREIGN KEY (author)
        REFERENCES users (id) MATCH SIMPLE
);`;

const comments = `CREATE TABLE IF NOT EXISTS comments
(
    id serial PRIMARY KEY NOT NULL,
    comment text NOT NULL,
    article integer NOT NULL,
    author integer NOT NULL,
    created time without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT article FOREIGN KEY (article)
      REFERENCES articles (id) MATCH SIMPLE
);`;

const myTables = [users, articles, comments];

const createTables = async () => {
  
  await myTables.forEach((table) => {
    config.pool.query(table, (err, res) => {
      if (err) {
        return (err.stack);
      }
    });
  });
};


export default {
  createTables,
};
