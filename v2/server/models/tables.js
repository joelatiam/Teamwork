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

const myTables = [users];

const createTables = () => {
  myTables.forEach((table) => {
    config.pool.query(table, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
    });
  });
};

export default createTables;
