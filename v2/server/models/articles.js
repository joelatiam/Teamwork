import config from '../config/config';

const newArt = `INSERT INTO articles 
(title, category, article, author )
    VALUES ($1, $2, $3, $4)`;

const newCom = `INSERT INTO comments 
(comment, article, author)
    VALUES ($1, $2, $3);`;

const selectNewArticle = 'SELECT * FROM articles WHERE author = $1 ORDER BY id  DESC LIMIT 1';
const articleByID = 'SELECT * FROM articles WHERE id = $1';
const allArticles = 'SELECT * FROM articles ORDER BY id  DESC';

const selectNewCom = 'SELECT * FROM comments WHERE author = $1 ORDER BY id  DESC LIMIT 1';
const comByArt = 'SELECT * FROM comments WHERE article = $1 ORDER BY id  DESC';

const updateAll = 'UPDATE articles SET title = $2, article = $3, category = $4, lastupdate = CURRENT_TIMESTAMP WHERE id = $1';
const updateTitle = 'UPDATE articles SET title = $2, article = $3, lastupdate = CURRENT_TIMESTAMP WHERE id = $1';
const updateCat = 'UPDATE articles SET article = $2, category = $3, lastupdate = CURRENT_TIMESTAMP WHERE id = $1';
const updatePost = 'UPDATE articles SET article = $2, lastupdate = CURRENT_TIMESTAMP WHERE id = $1';

const deleteArticle = 'DELETE FROM articles WHERE id = $1';
const deleteComment = 'DELETE FROM comments WHERE article = $1';

const removeArticle = async (art) => {
  try {
    config.pool.query(deleteComment, [art]);
    const article = await config.pool.query(deleteArticle, [art]);
    return article.rowCount;
  } catch (err) {
    return false;
  }
};
const findArticleByID = async (art) => {
  try {
    const article = await config.pool.query(articleByID, [art]);
    return article.rows[0];
  } catch (err) {
    return false;
  }
};

const getAll = async () => {
  try {
    const articles = await config.pool.query(allArticles);
    if (articles.rows.length > 1) {
      return articles.rows;
    }
    return articles.rows[0];
  } catch (err) {
    return false;
  }
};

const updateArt = async (data) => {
  const {
    articleID, title, article, category,
  } = data;

  try {
    switch (true) {
      case (title.length > 0 && article.length > 0 && category.length > 0):
        await config.pool.query(updateAll, Object.values(data));
        break;
      case (title.length > 0 && article.length > 0):
        await config.pool.query(updateTitle, [articleID, title, article]);
        break;
      case (article.length > 0 && category.length > 0):
        await config.pool.query(updateCat, [articleID, article, category]);
        break;
      default:
        await config.pool.query(updatePost, [articleID, article]);
        break;
    }
    const art = await findArticleByID(data.articleID);
    return art;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const newArticle = async (a) => {
  try {
    await config.pool.query(newArt, [a.title, a.category, a.article, a.author]);
    const article = await config.pool.query(selectNewArticle, [a.author]);
    return article.rows[0];
  } catch (err) {
    return (err);
  }
};

const newComment = async (com) => {
  try {
    await config.pool.query(newCom, [com.comment, com.article, com.author]);
    const comment = await config.pool.query(selectNewCom, [com.author]);
    return comment.rows[0];
  } catch (err) {
    return false;
  }
};

const commentByarticle = async (id) => {
  try {
    const comment = await config.pool.query(comByArt, [id]);
    return comment.rows;
  } catch (err) {
    return false;
  }
};


export default {
  newArticle,
  findArticleByID,
  updateArt,
  newComment,
  commentByarticle,
  getAll,
  removeArticle,
};
