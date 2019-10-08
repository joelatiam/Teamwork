/* eslint-disable linebreak-style */
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import doc from './doc';
import router from './routes';
import createTables from './models/tables';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router.auth);
app.use(router.articles);

app.use(doc);

app.get('/api/v2', (req, res) => {
  res.send('Welcome to Teamwork api/v2!');
});


app.listen(process.env.PORT, () => console.log(`Teamwork app listening on port ${process.env.PORT}!`));

createTables();

export default app;
