/* eslint-disable linebreak-style */
import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Teamwork!');
});
app.listen(process.env.PORT, () => console.log(`Teamwork app listening on port ${process.env.PORT}!`));
