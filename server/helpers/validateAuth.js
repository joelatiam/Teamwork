import errorMessage from './errorMessage';
import myDB from '../models/myDB';
import checkInput from './checkInput';

const user = {};

const regexpressions = {
  name: /[^A-Za-zÀ-ÿ]/g,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  pwSpace: /\s/g,
  address: /^\s/g,
};


const weakPassword = (value) => {
  const arrayPw = value.split('');
  const newValue = Array.from(new Set(arrayPw));
  return newValue.length < 4;
};

const { email, pwSpace } = regexpressions;


const validateName = (res, key, value) => {
  const checkedName = checkInput.checkLength(res, key, value, 2);
  if (checkedName === true) {
    user[key] = value.slice(0, 20);
  }
};

const validateEmail = (res, key, value) => {
  const checkedEmail = checkInput.checkLength(res, key, value);
  const checkFormat = email.test(value);
  if (!checkFormat) {
    errorMessage.emailFormat(res);
  } else if (checkedEmail === true && checkFormat) {
    user[key] = value;
  }
};

const validatePassWord = (res, key, value) => {
  switch (true) {
    case (value === ''):
      errorMessage.emptyWord(res, key);
      break;
    case (value.length < 6 || value.length > 20):
      errorMessage.passwordLenght(res, key);
      break;
    case (pwSpace.test(value)):
      errorMessage.passwordSpace(res, key);
      break;
    case (weakPassword(value)):
      errorMessage.passwordWeak(res, key);
      break;
    default:
      user[key] = value;
      break;
  }
};

const validateWord = (res, key, value) => {
  if (value && value.length > 1) {
    user[key] = value;
  } else if (!value) {
    user[key] = undefined;
  } else {
    errorMessage.shortLength(res, key, 2);
  }
};

const validateNameGenderPw = (res, key, value) => {
  switch (true) {
    case (key === 'firstName' || key === 'lastName'):
      validateName(res, key, value);
      break;
    case (key === 'gender'):
      if (!myDB.myGender.includes(value)) {
        errorMessage.invalidGender(res);
      } else {
        user[key] = value;
      }
      break;
    case (key === 'password'):
      validatePassWord(res, key, value);
      break;
    default:
      break;
  }
};

const authValidation = (res, key, val) => {
  const value = val ? val.trim() : null;
  delete user[key];
  switch (true) {
    case (key === 'firstName' || key === 'lastName' || key === 'password' || key === 'gender'):
      validateNameGenderPw(res, key, value);
      break;
    case (key === 'email'):
      validateEmail(res, key, value);
      break;
    case (key === 'address' || key === 'jobRole' || key === 'department'):
      validateWord(res, key, value);
      break;
    default:
      break;
  }
};

export default {
  authValidation,
  user,
};
