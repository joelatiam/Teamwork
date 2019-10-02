import myDB from '../models/myDB';

const shorten = (word, max) => {
  let newWord = word;
  if (newWord.length > max) {
    newWord = word.slice(0, max - 3);
    newWord += '...';
  }
  return newWord;
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
  article = shorten(article, 100);
  title = shorten(title, 55);
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
