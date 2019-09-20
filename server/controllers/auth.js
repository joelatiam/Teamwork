import auth from '../helpers/auth';

// Create a user
const signup = (req, res) => {
  const user = auth.validateSignup(res, req.body);
 
  const userKeys = Object.keys(user);
  if (userKeys.length > 0) {
    auth.createAccount(res, user);
  }
};


export default {
  signup,
};
