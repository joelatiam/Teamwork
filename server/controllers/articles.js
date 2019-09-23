import { verifyJWT } from '../helpers/myJWT';
import errorMessage from '../helpers/errorMessage';

const verifyToken = (req, res) => {
  if (req.headers.authorization) {
    const access = verifyJWT(req.headers.authorization);
    if (access) {
      return access;
    }
    errorMessage.invalidToken(res);
  } else {
    errorMessage.missingToken(res);
  }
};

const newArticle = (req, res) => {
  const checkToken = verifyToken(req, res);
  if(checkToken){
    
  }
};

export default {
  newArticle,
};
