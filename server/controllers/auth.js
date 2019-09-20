import auth from '../helpers/auth';

// Create a user
const signup = (req, res) => {
  const user = auth.validateSignup(res, req.body);

  if (user) {
    auth.createAccount(res, user);
    // console.log(user);
  }
};


export default {
  signup,
};
