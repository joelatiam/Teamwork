import myDB from '../models/myDB';
import errorMessage from './errorMessage';
import validateAuth from './validateAuth';
import { generateJWT } from './myJWT';

const user = {};

// check if the input meets the expectation
const checkUserInput = (res, expected, data) => {
  const inputedKeys = Object.keys(data);
  const inputedValues = Object.values(data);
  const acceptedKeys = inputedKeys.filter((key) => expected.includes(key));

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
        } else errorMessage.missingFields(res, expected);
      }
    });
  } else {
    errorMessage.requestNotAccepted(res, expected);
  }
  const accepted = Object.keys(validateAuth.user);
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

const infoToSend = (uObject) => ({
  Name: `${uObject.firstName} ${uObject.lastName}`,
  email: uObject.email,
  role: `${uObject.jobRole} in ${uObject.department} department`,
  joined: uObject.joined.toLocaleDateString('US'),
});

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

  const data = [{ token: generateJWT(userObject) }, infoToSend(userObject)];
  res.status(201).json({
    status: 201,
    message: 'user created successfully',
    data,
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


export default {
  validateSignup,
  createAccount,
};
