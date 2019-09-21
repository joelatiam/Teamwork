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

};


const emptyWord = (res, userInput) => res.status(400).json({
  status: 400,
  error: `${userInput} ${errorMessage.emptyString}`,
});

const nameLenght = (res, userInput) => res.status(400).json({
  status: 400,
  error: `${userInput} ${errorMessage.userName}`,
});

const nameCharacter = (res, userInput) => res.status(400).json({
  status: 400,
  error: `${userInput} ${errorMessage.wrongCharacter}`,
});

const emailFormat = (res) => res.status(400).json({
  status: 400,
  error: errorMessage.wrongEmailFormat,
  'example of a valide email': 'joelatiam@googlemail.com',
});

const emailIsUsed = (res, userEmail) => res.status(409).json({
  status: 409,
  error: `${userEmail} ${errorMessage.usedEmail}`,
});

const passwordLenght = (res, userInput) => res.status(400).json({
  status: 400,
  error: `${userInput} ${errorMessage.pwLenght}`,
});

const passwordSpace = (res, userInput) => res.status(400).json({
  status: 400,
  error: `${userInput} ${errorMessage.pwSpace}`,
});

const passwordWeak = (res, userInput) => res.status(400).json({
  status: 400,
  error: `${userInput} ${errorMessage.weakPass}`,
});

const invalidGender = (res) => res.status(400).json({
  status: 400,
  error: 'Gender should be male , female or other',
});

const requestNotAccepted = (res, expectedKeys) => res.status(400).json({
  status: 400,
  error: 'Sorry, your request data was not accepted, please send your data has required ',
  'content-type': 'application / x - www - form - urlencoded',
  'required fields': expectedKeys,
});

const missingFields = (res, expectedKeys) => res.status(400).json({
  status: 400,
  error: 'Sorry, send all the required datas',
  'required fields': expectedKeys,
});

// login Error
const failedAuth = (res) => res.status(404).json({
  status: 404,
  Message: 'Wrong email or password',
});

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
};
