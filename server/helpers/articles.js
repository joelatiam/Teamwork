import errorMessage from './errorMessage';
import myDB from '../models/myDB';

const displayNewArticle = (res, article) => {
  res.status(201).json({
    status: 201,
    message: 'article successfully created',
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
    displayNewArticle(res, myDB.articles[newData - 1]);
  } else {
    errorMessage.topicNotfound(res);
  }
};

const validateArticle = (res, data, author) => {
  const { title, topic, article } = data;
  const hasWord = /\w/g;

  switch (true) {
    case (title.length < 2):
      errorMessage.shortTitle(res);
      break;
    case (article.length < 10):
      errorMessage.shortArticle(res);
      break;
    // eslint-disable-next-line no-restricted-globals
    case (isNaN(parseInt(topic, 10)) || topic <= 0):
      errorMessage.invalidTopicID(res);
      break;
    case (!hasWord.test(title)):
      errorMessage.needWords(res, 'Title');
      break;
    case (!hasWord.test(article)):
      errorMessage.needWords(res, 'Article');
      break;
    default:
      shareArticle(res, author, title, article, topic);
      break;
  }
};


export default {
  validateArticle,
};
