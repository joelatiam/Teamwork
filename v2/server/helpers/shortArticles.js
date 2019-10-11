import myDB from '../models/myDB';

const shorten = (word, max) => {
  let newWord = word;
  if (newWord.length > max) {
    newWord = word.slice(0, max - 3);
    newWord += '...';
  }
  return newWord;
};

const createdFormat = (moment) => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const time = moment.toLocaleTimeString('fr-FR');
  const created = moment.toLocalecreatedString('US', options);

  return `${time} on ${created}`;
};

const authorsName = (author) => {
  const user = myDB.users.find((u) => u.id === author);
  return `${user.firstName} ${user.lastName}`;
};

const shortPost = (post) => {
  let {
    created,
    title,
    article,
    author,
    category,
  } = post;

  const { id } = post;
  article = shorten(article, 100);
  title = shorten(title, 55);

  return {
    id, author, created, title, category, article,
  };
};

export default {
  shortPost,
};
