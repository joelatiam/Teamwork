import errorMessage from './errorMessage';
import checkInput from './checkInput';
import myDB from '../models/myDB';
import shortArticles from './shortArticles';

const displayNewArticle = (res, article, type) => {
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
      message: 'relevant-success-message',
      data: {
        ID: comment.id,
        Date: comment.date,
        Comment: comment.comment,
        Author: comment.author,
        'Article ID': comment.article,
        'Article Title': article.title,
        'Article Author': article.author,
      },
    });
  }
};

const shareArticle = (res, author, title, article, topic) => {
  title.trim();
  article.trim();
  const newTitle = title.slice(0, 60);
  const newArticle = article.slice(0, 2000);

  if (myDB.topics[topic]) {
    const newData = myDB.articles.push({
      id: myDB.articles.length + 1,
      date: new Date(),
      title: newTitle,
      article: newArticle,
      author,
      topic,
    });
    displayNewArticle(res, myDB.articles[newData - 1], 'new');
  } else {
    errorMessage.IDNotfound(res, 'Topic');
  }
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

const validateArticle = (res, data, author) => {
  const { title, topic, article } = data;

  const checkedTitle = checkInput.checkLength(res, 'Title', title, 2);
  const checkedArticle = checkInput.checkLength(res, 'Article', article, 10);
  const checkedTopic = checkInput.checkID(res, topic, 'Topic');

  if (checkedTitle === true && checkedArticle === true && checkedTopic === true) {
    shareArticle(res, author, title, article, topic);
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

const displayAllArticles = (res, articles) => {
  res.status(200).json({
    status: 200,
    data: articles,
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

const deletionAuth = (res, author, articleID) => {
  let status = false;
  const findArticle = myDB.articles.find((art) => art.id === articleID);
  if (findArticle) {
    if (findArticle.author === author) {
      status = true;
    } else {
      errorMessage.NotAuthorized(res, 'Delete this article');
    }
  } else {
    errorMessage.IDNotfound(res, 'Article');
  }
  return status;
};

const deletePost = (res, author, articleID) => {
  const checkedarticleID = checkInput.checkID(res, articleID, 'articleID');
  if (checkedarticleID) {
    const checkAuthorization = deletionAuth(res, author, articleID);
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
};
