import jwt from 'jsonwebtoken';
import errorMessage from './errorMessage';


const generateJWT = ({ id, email, isAdmin }) => jwt.sign({ id, email, isAdmin }, process.env.SECRET, { expiresIn: '365d' });

// eslint-disable-next-line consistent-return
const verifyJWT = (res, uToken) => {
  try {
    return jwt.verify(uToken, process.env.SECRET);
  } catch (error) {
    errorMessage.invalidToken(res);
  }
};

export {
  generateJWT,
  verifyJWT,
};
