import errorMessage from './errorMessage';
import checkInput from './checkInput';
import myDB from '../models/myDB';

const displayNewArticle = (res, article, status) => {
  const message = (status === 'new') ? 'article successfully created' : 'article successfully updated';
  res.status(201).json({
    status: 201,
    message,
    article,
  });
};
const shareArticle = (res, author, title, article, topic) => {
  title.trim();
  article.trim();
  const newTitle = title.slice(0, 60);
  const newArticle = article.slice(0, 2000);

  if (myDB.articles[topic]) {
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
    errorMessage.topicNotfound(res);
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

const validateComment = (res, author, Ucomment, articleID) => {
  Ucomment.trim();

  const checkedComment = checkInput.checkLength(res, 'Comment', Ucomment, 2);
  const checkedArticleID = checkInput.checkID(res, articleID, 'articleID');

  if (checkedComment === true && checkedArticleID === true) {

  }
};

export default {
  validateArticle,
  validateComment,
};
