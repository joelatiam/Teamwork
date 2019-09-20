import myDB from '../models/myDB';
import errorMessage from './errorMessage';
import validateAuth from './validateAuth';

const user = {};

// check if the input meets the expectation
const checkUserInput = (res, expected, data) => {
  const inputedKeys = Object.keys(data);
  const inputedValues = Object.values(data);
  const acceptedKeys = inputedKeys.filter((key) => expected.includes(key));

  // if the client provided all the required keys
  if (acceptedKeys.length === expected.length) {
    inputedKeys.forEach((key) => {
      const value = data[key];
      validateAuth.authValidation(res, key, value);
    });

    // if the request came in the required order
    acceptedKeys.forEach((key) => {
      const keyIndex = acceptedKeys.indexOf(key);
      if (acceptedKeys[keyIndex] === expected[keyIndex]) {
        if (inputedValues[keyIndex].length > 0) {
          user[expected[keyIndex]] = inputedValues[keyIndex];
        } else {
          errorMessage.missingFields(res, expected);
        }
      }
      //   console.log(key);
    });
  } else {
    errorMessage.requestNotAccepted(res, expected);
  }
  return user;
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

  return res.status(201).json({
    status: 201,
    message: 'user created successfully',
    data: userObject,
  });
};
const createAccount = (res, newUser) => {
  const usedEmail = myDB.users.find((u) => u.email === newUser.email);

  if (usedEmail) {
    return errorMessage.emailIsUsed(res, newUser.email);
  }

  return createNewUser(res, newUser);
};


export default {
  validateSignup,
  createAccount,
};
