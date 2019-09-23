const errorMessage = {
  emptyString: 'Should not be empty',
  userName: 'Length should be between 2 to 20 characters',
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
  titleLength: 'Your title should contain at least 2 characters',
  articleLength: 'Your article need some words',
  idFormat: 'Send an interger representing the topic ID',
  requireWords: 'should contain word characters',
  noTopcID: 'No matching Topic category',

};

const sendError = (res, code, errorText, ...fields) => {
  const myObject = {};
  myObject.status = code;
  myObject.error = errorText;
  if (fields.length > 0) {
    myObject['required fields'] = fields;
    myObject['content-type'] = 'application / x - www - form - urlencoded';
  }

  const buildResponse = res.status(code).json(myObject);
  return buildResponse;
};

const emptyWord = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.emptyString}`);

const nameLenght = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.userName}`);

const nameCharacter = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.wrongCharacter}`);

const emailFormat = (res) => sendError(res, 400, errorMessage.wrongEmailFormat);

const emailIsUsed = (res, userEmail) => sendError(res, 400, `${userEmail} ${errorMessage.usedEmail}`);

const passwordLenght = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.pwLenght}`);

const passwordSpace = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.pwSpace}`);

const passwordWeak = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.weakPass}`);

const invalidGender = (res) => sendError(res, 400, errorMessage.gender);

const requestNotAccepted = (res, keys) => sendError(res, 400, errorMessage.invalidRequest, keys);

const missingFields = (res, keys) => sendError(res, 400, errorMessage.missingFields, keys);

const failedAuth = (res) => sendError(res, 400, errorMessage.failedAuth);

const invalidToken = (res) => sendError(res, 400, errorMessage.wrongToken);

const missingToken = (res) => sendError(res, 400, errorMessage.noToken);

const shortTitle = (res) => sendError(res, 400, errorMessage.titleLength);

const shortArticle = (res) => sendError(res, 400, errorMessage.articleLength);

const invalidTopicID = (res) => sendError(res, 400, errorMessage.idFormat);

const topicNotfound = (res) => sendError(res, 400, errorMessage.noTopcID);


const needWords = (res, userInput) => sendError(res, 400, `${userInput} ${errorMessage.requireWords}`);


export default {
  emptyWord,
  nameLenght,
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
  shortTitle,
  shortArticle,
  invalidTopicID,
  needWords,
  topicNotfound,
};
