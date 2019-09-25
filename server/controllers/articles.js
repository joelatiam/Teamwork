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
const checkArticleBody = (body) => {
  const { title, topic, article } = body;
  if (title && topic && article) {
    return true;
  }
  return false;
};

const checkArticleOption = (req, status) => {
  const { articleID } = req.params;
  if (status === 'new article') {
    return true;
  } if (status === 'edit article' && articleID) {
    return true;
  }
  return false;
};

const checkParams = (req, status) => {
  let valid = false;
  if (req.body) {
    const checkBody = checkArticleBody(req.body);
    if (checkBody) {
      valid = checkArticleOption(req, status);
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

const editFields = ['title', 'topic', 'article', 'articleID as URL parameter'];
const editArtOpiton = 'Edit this Article';
const getID = (req) => {
  let { articleID } = req.params;
  articleID = parseInt(articleID, 10);
  return articleID;
};

const getAuth = (req, res, author)=>{
  const articleID = getID(req);
  const authorize = articles.checkAuth(res, author, articleID, editArtOpiton);
  return authorize;
}

const editArticle = (req, res) => {
  const user = verifyToken(req, res);
  let verifyParam = false;
  let authorize = false;
  let articleID = null;
  let author = null;
  let datas = null;

  if (user) {
    // console.table(user);
    articleID = getID(req);
    verifyParam = checkParams(req, 'edit article');
    author = user.email;

    if (verifyParam) {
      authorize = getAuth(req, res, author);
    }
    if (authorize) {
      datas = req.body;
      articles.validateArticle(res, datas, author, articleID);
    } else {
      errorMessage.requestNotAccepted(res, editFields);
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
