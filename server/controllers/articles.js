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

const newArticle = (req, res) => {
  const user = verifyToken(req, res);
  if (user) {
    // console.table(user);
    if (req.body && req.body.title && req.body.topic && req.body.article) {
      // console.table(req.body);
      articles.validateArticle(res, req.body, user.email);
    } else {
      errorMessage.requestNotAccepted(res, ['title', 'topic', 'article']);
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

export default {
  newArticle,
  newComment,
};
