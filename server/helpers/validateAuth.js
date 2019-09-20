import errorMessage from './errorMessage';
import myDB from '../models/myDB';

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
  switch (true) {
    case (value === ''):
      errorMessage.emptyWord(res, key);
      break;
    case (value.length > 20 || value.length < 2):
      errorMessage.nameLenght(res, key);
      break;
    case (regexpressions.name.test(value)):
      errorMessage.nameCharacter(res, key);
      break;
    default:
      console.log(key)
      user[key] = value;
      break;
  }
};

const validateEmail = (res, key, value) => {
  switch (true) {
    case (value === ''):
      errorMessage.emptyWord(res, key);
      break;
    case (!email.test(value)):
      errorMessage.emailFormat(res);
      break;
    default:
      user[key] = value;
      break;
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

const validateDepartment = (res, key, value) => {
  switch (true) {
    case (value === ''):
      errorMessage.emptyWord(res, key);
      break;
    default:
      user[key] = value;
      break;
  }
};

const validateJobRole = (res, key, value) => {
  switch (true) {
    case (value === ''):
      errorMessage.emptyWord(res, key);
      break;
    default:
      user[key] = value;
      break;
  }
};

const validateAddress = (res, key, value) => {
  switch (true) {
    case (value === ''):
      errorMessage.emptyWord(res, key);
      break;
    default:
      user[key] = value;
      break;
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

const authValidation = (res, key, value) => {
  delete user[key];
  switch (true) {
    case (key === 'firstName' || key === 'lastName' || key === 'password' || key === 'gender'):
      validateNameGenderPw(res, key, value);
      break;
    case (key === 'email'):
      validateEmail(res, key, value);
      break;
    case (key === 'address'):
      validateAddress(res, key, value);
      break;
    case (key === 'jobRole'):
      validateJobRole(res, key, value);
      break;
    case (key === 'department'):
      validateDepartment(res, key, value);
      break;
    default:
      break;
  }
};

export default {
  authValidation,
  user,
};
