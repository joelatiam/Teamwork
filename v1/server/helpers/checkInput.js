import errorMessage from './errorMessage';

// eslint-disable-next-line consistent-return
const checkLength = (res, type, word, ...required) => {
  const hasWord = /\w/g;
  switch (true) {
    case (word === ''):
      errorMessage.emptyWord(res, type);
      break;
    case (required.length > 0 && word.length < required):
      errorMessage.shortLength(res, type, required);
      break;
    case (!hasWord.test(word)):
      errorMessage.needWords(res, type);
      break;
    default:
      return true;
  }
};

const checkID = (res, id, type) => {
  if (Number.isNaN(parseInt(id, 10)) || id <= 0) {
    errorMessage.invalidID(res, type);
  } else {
    return true;
  }
};

export default {
  checkLength,
  checkID,
};
