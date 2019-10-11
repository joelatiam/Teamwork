import config from '../config/config';
import errorMessage from '../helpers/errorMessage';

const checkEmail = 'SELECT * FROM users WHERE email = $1';
const login = 'SELECT * FROM users WHERE email = $1 AND  password = $2';
const newUser = `INSERT INTO users 
    (firstName, lastName, email, password, gender, jobRole, department, address, isadmin )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

const sendToDB = async (type, data, resultType, resOption) => {
  try {
    await config.pool.connect();
    await config.pool.query(type, data);
    const result = await config.pool.query(resultType, [resOption]);
    return result.rows[0];
  } catch (err) {
    return (err);
  }
};

const signup = async (res, param) => {
  const dataToInput = Object.values(param);
  const { email } = param;
  dataToInput.push(false);
  const user = await sendToDB(newUser, dataToInput, checkEmail, email);
  return user;
};

const validateSignup = async (res, param) => {
  try {
    const ifExist = await config.pool.query(checkEmail, [param.email]);
    if (ifExist.rows[0]) {
      errorMessage.emailIsUsed(res, param.email);
    } else {
      const user = await signup(res, param);
      return (user);
    }
  } catch (err) {
    return (err);
  }
};

const signin = async (email, password) => {
  const user = await config.pool.query(login, [email, password]);
  return user.rows[0];
};

export default {
  validateSignup,
  signin,
};
