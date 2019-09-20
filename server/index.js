/* eslint-disable linebreak-style */
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router.auth);

app.get('/', (req, res) => {
  res.send('Welcome to Teamwork!');
});


app.listen(process.env.PORT, () => console.log(`Teamwork app listening on port ${process.env.PORT}!`));
