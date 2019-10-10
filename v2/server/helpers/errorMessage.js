const errorMessage = {
  emptyString: 'Should not be empty',
  shortLength: 'Length should contain at least',
  wrongCharacter: 'Please Input only characters between A to Z',
  wrongEmailFormat: 'Sorry, your email format was not accepted',
  pwLenght: 'Rerquired length 6-20 characters',
  pwSpace: 'Empty spaces are not alowed',
  weakPass: 'Is weak, input at least 4 different characters of a length of 6',
  usedEmail: 'Email is used by another user',
  wrongMailPass: 'Wrong Email or Password',
  wrongToken: 'You have provided an invalid token',
  gender: 'Gender should be male , female or other',
  invalidRequest: 'Sorry, your request data was not accepted, please send your data has required ',
  missingFields: 'Sorry, send all the required datas',
  failedAuth: 'Wrong email or password',
  noToken: 'Please signin to get the token key',
  articleLength: 'Your article need some words',
  idFormat: 'ID format is not valid',
  requireWords: 'should contain word characters',
  noID: 'ID was not found',
  authorization: 'You are not authorized to',
};

const sendError = (res, code, errorText, ...fields) => {
  const myObject = {};
  myObject.status = code;
  myObject.error = errorText;
  if (fields.length > 0) {
    myObject['required fields'] = fields;
    myObject['content-type'] = 'application / x - www - form - urlencoded';
  }

  res.status(code).json(myObject);
};

const emptyWord = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.emptyString}`);

const shortLength = (res, word, length) => sendError(res, 400, `Your ${word} ${errorMessage.shortLength} ${length} characters `);

const nameCharacter = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.wrongCharacter}`);

const emailFormat = (res) => sendError(res, 400, errorMessage.wrongEmailFormat);

const emailIsUsed = (res, userEmail) => sendError(res, 409, `${userEmail} ${errorMessage.usedEmail}`);

const passwordLenght = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.pwLenght}`);

const passwordSpace = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.pwSpace}`);

const passwordWeak = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.weakPass}`);

const invalidGender = (res) => sendError(res, 400, errorMessage.gender);

const requestNotAccepted = (res, keys) => sendError(res, 400, errorMessage.invalidRequest, keys);

const missingFields = (res, keys) => sendError(res, 400, errorMessage.missingFields, keys);

const failedAuth = (res) => sendError(res, 401, errorMessage.failedAuth);

const invalidToken = (res) => sendError(res, 401, errorMessage.wrongToken);

const missingToken = (res) => sendError(res, 401, errorMessage.noToken);

const shortArticle = (res) => sendError(res, 400, errorMessage.articleLength);

const invalidID = (res, type) => sendError(res, 400, `Your ${type} ${errorMessage.idFormat}`);

const IDNotfound = (res, type) => sendError(res, 404, `Your ${type} ${errorMessage.noID}`);

const needWords = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.requireWords}`);

const NotAuthorized = (res, type) => sendError(res, 403, `${errorMessage.authorization} ${type}`);

export default {
  emptyWord,
  shortLength,
  nameCharacter,
  emailFormat,
  emailIsUsed,
  passwordLenght,
  passwordSpace,
  passwordWeak,
  invalidGender,
  requestNotAccepted,
  missingFields,
  failedAuth,
  invalidToken,
  missingToken,
  shortArticle,
  invalidID,
  needWords,
  IDNotfound,
  NotAuthorized,
};
