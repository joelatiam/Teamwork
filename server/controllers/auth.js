import auth from '../helpers/auth';
import errorMessage from '../helpers/errorMessage';


const signup = (req, res) => {
  const user = auth.validateSignup(res, req.body);

  if (user) {
    auth.createAccount(res, user);
  }
};

const signin = (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    auth.signin(res, req.body);
  } else {
    errorMessage.requestNotAccepted(res, ['email', 'password']);
  }
};

export default {
  signup,
  signin,
};
