import myDB from '../models/myDB';
import errorMessage from './errorMessage';
import validateAuth from './validateAuth';
import { generateJWT } from './myJWT';


const checkUserInput = (res, expected, data) => {
  const inputedKeys = Object.keys(data);
  const acceptedKeys = inputedKeys.filter((key) => expected.includes(key));

  if (acceptedKeys.length === expected.length) {
    inputedKeys.forEach((key) => {
      const value = data[key];
      validateAuth.authValidation(res, key.trim(), value.trim());
    });
  } else {
    errorMessage.requestNotAccepted(res, expected);
  }
  const accepted = Object.keys(validateAuth.user);

  // if (expected.length > accepted.length) {
  //   // console.table(accepted)
  //   errorMessage.missingFields(res, expected);
  // }
  return expected.length === accepted.length ? validateAuth.user : null;
};

// Validate Signup datas before input
const validateSignup = (res, data) => {
  const expected = ['firstName', 'lastName', 'email', 'password', 'gender', 'jobRole', 'department', 'address'];
  return checkUserInput(res, expected, data);
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
  const keysTobeUpdated = Object.keys(newUser);
  const dataToInput = Object.values(newUser);

  keysTobeUpdated.forEach((key) => {
    const keyIndex = keysTobeUpdated.indexOf(key);
    userObject[keysTobeUpdated[keyIndex]] = dataToInput[keyIndex];
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
