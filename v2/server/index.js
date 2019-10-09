/* eslint-disable linebreak-style */
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import router from './routes';
import tables from './models/tables';

const port = process.env.PORT || 3000;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router.auth);
app.use(router.articles);

app.get('/api/v2', (req, res) => {
  res.send('Welcome to Teamwork v2!');
});


app.listen(port);
tables.createDB();
tables.createTables();

export default app;
