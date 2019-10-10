import config from '../config/config';
import errorMessage from '../helpers/errorMessage';

const newArt = `INSERT INTO articles 
    (title, category, article, author )
    VALUES ($1, $2, $3, $4)`;

const selectNewArticle = 'SELECT * FROM articles WHERE author = $1 ORDER BY id  DESC LIMIT 1';

const newArticle = async (a) => {
  try {
    await config.pool.query(newArt, [a.title, a.category, a.article, a.author]);
    const article = await config.pool.query(selectNewArticle, [a.author]);
    return article.rows[0];
  } catch (err) {
    return (err);
  }
};

export default {
  newArticle,
};
