import { verifyJWT } from '../helpers/myJWT';
import errorMessage from '../helpers/errorMessage';
import articles from '../helpers/articles';

// eslint-disable-next-line consistent-return
const verifyToken = (req, res) => {
  if (req.headers.authorization) {
    const tokenKey = req.headers.authorization.split(' ')[1];
    const access = verifyJWT(res, tokenKey);
    if (access) {
      const { id, email, isAdmin } = access;
      return { id, email, isAdmin };
    }
  } else {
    errorMessage.missingToken(res);
  }
};

const newArticle = (req, res) => {
  const user = verifyToken(req, res);
  if (user) {
    // console.table(user);
    if (req.body.article) {
      // console.table(req.body);
      articles.validateArticle(res, req.body, user.id);
    } else {
      errorMessage.requestNotAccepted(res, ['article', 'optional: title ,topic']);
    }
  }
};

const getID = (req) => {
  let { articleID } = req.params;
  articleID = parseInt(articleID, 10);
  return articleID;
};

const editFields = ['title', 'articleID as URL parameter', 'optional : topic, article'];
const editArtOpiton = 'Edit this Article';

const editArticle = (req, res) => {
  const user = verifyToken(req, res);
  const articleID = getID(req);
  let author = null;

  if (user && req.body.article) {
    author = user.id;
    const authorize = articles.checkAuth(res, author, articleID, editArtOpiton);

    if (authorize) {
      const datas = req.body;
      articles.validateArticle(res, datas, author, articleID);
    }
  } else {
    errorMessage.requestNotAccepted(res, editFields);
  }
};

const newComment = (req, res) => {
  const user = verifyToken(req, res);
  if (user) {
    // console.table(user);
    if (req.body && req.params && req.body.comment) {
      // console.table(req.body);
      articles.validateComment(res, user.id, req.body.comment, req.params);
    } else {
      errorMessage.requestNotAccepted(res, ['articleID as URL parameter', 'comment']);
    }
  }
};

const articleDetails = (req, res) => {
  const user = verifyToken(req, res);
  if (user) {
    // console.table(user);
    if (req.params) {
      let { articleID } = req.params;
      articleID = parseInt(articleID, 10);
      articles.getArticle(res, articleID);
    } else {
      errorMessage.requestNotAccepted(res, ['articleID as URL parameter']);
    }
  }
};

const allArticles = (req, res) => {
  const user = verifyToken(req, res);
  if (user) {
    articles.getAllArticles(res);
  }
};

const deleteArticle = (req, res) => {
  const user = verifyToken(req, res);
  if (user) {
    let { articleID } = req.params;
    articleID = parseInt(articleID, 10);
    articles.deletePost(res, user.id, articleID);
  }
};

export default {
  newArticle,
  newComment,
  articleDetails,
  allArticles,
  deleteArticle,
  editArticle,
};
