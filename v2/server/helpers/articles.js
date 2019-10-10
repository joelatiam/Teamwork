import errorMessage from './errorMessage';
import checkInput from './checkInput';
import myDB from '../models/myDB';
import articles from '../models/articles';
import shortArticles from './shortArticles';

const checkAuth = async (res, author, articleID, authorization) => {
  let status = false;
  const findArticle = await articles.findArticleByID(articleID);
  if (findArticle) {
    if (findArticle.author === author) {
      status = true;
    } else {
      errorMessage.NotAuthorized(res, authorization);
    }
  } else {
    errorMessage.IDNotfound(res, 'Article');
  }
  return status;
};

const displayArticle = (res, article, type) => {
  const message = (type === 'new') ? 'article successfully created' : 'article successfully updated';
  res.status(201).json({
    status: 201,
    message,
    article,
  });
};

const displayNewComment = (res, comment) => {
  const article = myDB.articles.find((art) => art.id === comment.article);
  if (article) {
    res.status(201).json({
      status: 201,
      message: 'new article created',
      data: {
        id: comment.id,
        date: comment.date,
        comment: comment.comment,
        author: comment.author,
        'Article ID': comment.article,
        'Article Title': article.title,
        'Article Author': article.author,
      },
    });
  }
};

const editArticle = async (res, data, articleID) => {
  const dataTosend = Object.keys(data);
  const dataToDB = { articleID };
  const uData = data;

  dataTosend.forEach((key) => {
    if (uData[key] === undefined) {
      uData[key] = '';
    }
    dataToDB[key] = uData[key];
  });

  const article = await articles.updateArt(dataToDB);
  if (article) {
    displayArticle(res, article, 'update');
  }
};

const shareArticle = async (res, author, title, article, topic) => {
  const dataToDB = {
    title,
    category: topic,
    article,
    author,
  };
  const newArticle = await articles.newArticle(dataToDB);
  displayArticle(res, newArticle, 'new');
};


const addComment = (res, author, Ucomment, article) => {
  const comment = Ucomment.slice(0, 280);
  const findArticle = myDB.articles.find((art) => art.id === article);
  if (findArticle) {
    const newData = myDB.comments.push({
      id: myDB.comments.length + 1,
      date: new Date(),
      comment,
      author,
      article,
    });

    displayNewComment(res, myDB.comments[newData - 1]);
  } else {
    errorMessage.IDNotfound(res, 'Article');
  }
};

const trimArticle = (data, titleExist, topicExist) => {
  const artObj = {};
  artObj.article = data.article.trim().slice(0, 250);
  artObj.title = titleExist ? data.title.trim().slice(0, 60) : null;
  artObj.topic = topicExist ? data.topic.trim().slice(0, 20) : null;

  return artObj;
};

const validateArticle = async (res, data, author, ...articleID) => {
  const { title, topic, article } = data;

  const checkedTitle = title ? checkInput.checkLength(res, 'Title', title, 2) : null;
  const checkedArticle = article ? checkInput.checkLength(res, 'Article', article, 10) : null;
  const checkedTopic = topic ? checkInput.checkLength(res, 'Category', topic, 2) : null;

  if (checkedArticle === true) {
    const artObj = trimArticle(data, checkedTitle, checkedTopic);
    if (articleID.length > 0) {
      const myArticle = {
        title,
        article,
        category: topic,
      };
      editArticle(res, myArticle, articleID[0]);
    } else {
      shareArticle(res, author, artObj.title, artObj.article, artObj.topic);
    }
  }
};

const validateComment = (res, author, Ucomment, article) => {
  const articleID = parseInt(Object.values(article)[0], 10);
  Ucomment.trim();
  const checkedComment = checkInput.checkLength(res, 'Comment', Ucomment, 2);
  const checkedarticleID = checkInput.checkID(res, articleID, 'articleID');

  if (checkedComment === true && checkedarticleID === true) {
    addComment(res, author, Ucomment, articleID);
  }
};

const displayArticleDetails = (res, article) => {
  const comments = myDB.comments.filter((elt) => elt.article === article.id);
  res.status(200).json({
    status: 200,
    data: {
      article,
      comments: (comments.length > 0) ? comments : 'This article has no comment',
    },
  });
};

const getArticle = (res, articleID) => {
  const checkedarticleID = checkInput.checkID(res, articleID, 'articleID');
  if (checkedarticleID) {
    const findArticle = myDB.articles.find((art) => art.id === articleID);
    if (findArticle) {
      displayArticleDetails(res, findArticle);
    } else {
      errorMessage.IDNotfound(res, 'Article');
    }
  }
};

const displayAllArticles = (res, art) => {
  res.status(200).json({
    status: 200,
    data: art,
  });
};

const getAllArticles = (res) => {
  const myArticles = myDB.articles.reverse();
  const myShortArticles = [];
  myArticles.forEach((post) => {
    myShortArticles.push(shortArticles.shortPost(post));
  });
  displayAllArticles(res, myShortArticles);
};

const deletedResult = (res, type) => {
  res.status(200).json({
    status: 200,
    message: `${type} successfuly deleted`,
  });
};
const removeArticle = (articleID) => myDB.articles.filter((art) => art.id !== articleID);
const removeComments = (articleID) => myDB.comments.filter((com) => com.article !== articleID);

const deletePost = (res, author, articleID) => {
  const checkedarticleID = checkInput.checkID(res, articleID, 'articleID');
  if (checkedarticleID) {
    const checkAuthorization = checkAuth(res, author, articleID, 'Delete this article');
    if (checkAuthorization) {
      myDB.articles = removeArticle(articleID);
      myDB.comments = removeComments(articleID);
      deletedResult(res, 'Article');
    }
  }
};

export default {
  validateArticle,
  validateComment,
  getArticle,
  getAllArticles,
  deletePost,
  checkAuth,
};
