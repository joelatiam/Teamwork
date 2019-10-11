import jwt from 'jsonwebtoken';
import config from '../config/config';
import errorMessage from './errorMessage';


const generateJWT = ({ id, email, isAdmin }) => jwt.sign({ id, email, isAdmin }, config.secret, { expiresIn: '365d' });

// eslint-disable-next-line consistent-return
const verifyJWT = (res, uToken) => {
  try {
    return jwt.verify(uToken, config.secret);
  } catch (error) {
    errorMessage.invalidToken(res);
  }
};

export {
  generateJWT,
  verifyJWT,
};
