import myDB from '../models/myDB';

const newtitle = (title) => {
  let newTitle = title;
  if (newTitle.length > 55) {
    newTitle = title.slice(0, 52);
    newTitle += '...';
  }
  return newTitle;
};

const dateFormat = (moment) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const time = moment.toLocaleTimeString('fr-FR');
  const date = moment.toLocaleDateString('US', options);

  return `${time} on ${date}`;
};
const shortArticle = (art) => {
  let article = art;
  if (article.length > 100) {
    article = article.slice(0, 97);
    article += '...';
  }
  return article;
};
const authorsName = (author) => {
  const user = myDB.users.find((u) => u.email === author);
  return `${user.firstName} ${user.lastName}`;
};

const shortPost = (post) => {
  let {
    date,
    title,
    article,
    author,
    topic,
  } = post;

  const { id } = post;
  article = shortArticle(article);
  title = newtitle(title);
  date = dateFormat(date);
  topic = myDB.topics[post.topic];
  author = authorsName(author);

  return {
    id, author, date, title, topic, article,
  };
};

export default {
  shortPost,
};
