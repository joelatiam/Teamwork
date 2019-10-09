import auth from '../models/auth';
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

const createAccount = async (res, newU) => {
  try {
    const newUser = await auth.validateSignup(res, newU);
    if (newUser) {
      res.status(201).json({
        status: 201,
        message: 'user successfully created',
        data: signedUser(newUser),
      });
    }
  } catch (err) {
    res.send('server error');
  }
};

const login = async (res, data) => {
  const { email, password } = data;
  const signed = await auth.signin(email, password);

  if (signed) {
    res.status(200).json({
      status: 200,
      message: `${signed.firstname} ${signed.lastname} is successfully logged in`,
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
