import { verifyJWT } from '../helpers/myJWT';
import errorMessage from '../helpers/errorMessage';
import articles from '../helpers/articles';

// eslint-disable-next-line consistent-return
const verifyToken = (req, res) => {
  if (req.headers.authorization) {
    const tokenKey = req.headers.authorization.split(' ')[1];
    const access = verifyJWT(res, tokenKey);
    if (access) {
      const { email, isAdmin } = access;
      return { email, isAdmin };
    }
  } else {
    errorMessage.missingToken(res);
  }
};

const checkParams = (req, status) => {
  let valid = false;
  if (status === 'new article') {
    if (req.body && req.body.title && req.body.topic && req.body.article) {
      valid = true;
    }
  } else if (status === 'edit article') {
    if (req.body && req.body.title && req.body.topic && req.body.article && req.params) {
      valid = true;
    }
  }
  return valid;
};

const newArticle = (req, res) => {
  const user = verifyToken(req, res);
  if (user) {
    // console.table(user);
    if (checkParams(req, 'new article')) {
      // console.table(req.body);
      articles.validateArticle(res, req.body, user.email);
    } else {
      errorMessage.requestNotAccepted(res, ['title', 'topic', 'article']);
    }
  }
};

const editArticle = (req, res) => {
  const user = verifyToken(req, res);

  if (user) {
    // console.table(user);
    if (checkParams(req, 'edit article')) {
      const option = 'Edit this Article';
      let { articleID } = req.params;
      const author = user.email;
      articleID = parseInt(articleID, 10);
      const authorize = articles.checkAuth(res, author, articleID, option);

      if (authorize) {
        articles.validateArticle(res, req.body, author, articleID);
      }
    } else {
      errorMessage.requestNotAccepted(res, ['title', 'topic', 'article', 'articleID as URL parameter']);
    }
  }
};

const newComment = (req, res) => {
  const user = verifyToken(req, res);
  if (user) {
    // console.table(user);
    if (req.body && req.params && req.body.comment) {
      // console.table(req.body);
      articles.validateComment(res, user.email, req.body.comment, req.params);
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
    articles.deletePost(res, user.email, articleID);
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
