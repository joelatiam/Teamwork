import myDB from '../models/myDB';
import errorMessage from './errorMessage';
import validateAuth from './validateAuth';
import { generateJWT } from './myJWT';


const checkUserInput = (res, expected, optional, data) => {
  const inputedKeys = Object.keys(data);
  const requiredFields = inputedKeys.filter((key) => expected.includes(key)).slice(0, 5);
  // let optionalKeys = inputedKeys.filter((key) => optional.includes(key));
  // console.table(optionalKeys);
  const keyToDB = expected.concat(optional);

  if (requiredFields.length === expected.length) {
    keyToDB.forEach((key) => {
      const value = data[key];
      validateAuth.authValidation(res, key, value);
    });
  } else {
    errorMessage.requestNotAccepted(res, `${expected} Optional: ${optional}`);
  }
  const accepted = Object.keys(validateAuth.user);

  return keyToDB.length === accepted.length ? validateAuth.user : null;
};

const validateSignup = (res, data) => {
  const expected = ['firstName', 'lastName', 'email', 'password', 'gender'];
  const optional = ['jobRole', 'department', 'address'];
  return checkUserInput(res, expected, optional, data);
};


// User signup
const userObject = {
  id: undefined,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '',
  jobRole: '',
  department: '',
  address: '',
  isAdmin: false,
};

const signedUser = (user) => {
  const myToken = generateJWT(user);
  const userKeys = Object.keys(user);
  const data = {};
  data.token = myToken;
  userKeys.forEach((key) => {
    if (key !== 'password') {
      data[key] = user[key];
    }
  });
  return data;
};

const createNewUser = (res, newUser) => {
  const id = myDB.users.length + 1;
  const keysToUpdate = Object.keys(newUser);
  const dataToInput = Object.values(newUser);

  keysToUpdate.forEach((key) => {
    const keyIndex = keysToUpdate.indexOf(key);
    userObject[keysToUpdate[keyIndex]] = dataToInput[keyIndex] ? dataToInput[keyIndex] : null;
  });

  userObject.joined = new Date();
  userObject.id = id;
  myDB.users.push(userObject);

  res.status(201).json({
    status: 201,
    message: 'user successfully created',
    data: signedUser(userObject),
  });
};
const createAccount = (res, newU) => {
  const usedEmail = myDB.users.find((u) => u.email === newU.email);

  if (!usedEmail) {
    createNewUser(res, newU);
  } else {
    errorMessage.emailIsUsed(res, newU.email);
  }
};

const login = (res, data) => {
  const { email, password } = data;
  const signed = myDB.users.find((user) => user.email === email && user.password === password);

  if (signed) {
    res.status(200).json({
      status: 200,
      message: `${signed.firstName} ${signed.lastName} is successfully logged in`,
      data: signedUser(signed),
    });
  } else {
    errorMessage.failedAuth(res);
  }
};

const signin = (res, { email, password }) => {
  switch (true) {
    case (email === ''):
      errorMessage.emptyWord(res, 'email');
      break;
    case (password === ''):
      errorMessage.emptyWord(res, 'password');
      break;
    default:
      login(res, { email, password });
      break;
  }
};

export default {
  validateSignup,
  createAccount,
  signin,
};
