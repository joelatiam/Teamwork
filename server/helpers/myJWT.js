import jwt from 'jsonwebtoken';
import config from '../config/config';


const generateJWT = ({ id, email, isAdmin }) => jwt.sign({ id, email, isAdmin }, config.secret, { expiresIn: '7d' });

const verifyJWT = (uToken) => jwt.verify(uToken, config.secret);

export {
  generateJWT,
  verifyJWT,
};
