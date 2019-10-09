import apiVersion from '../helpers';

const userToSignup = {
  firstName: 'Joel',
  lastName: 'Atm',
  email: 'joeatiam@googlemail.com',
  password: '123456',
  gender: 'male',
  jobRole: 'Software Engineer',
  department: 'IT',
  address: '12 Av du Palmier, Kisangani',
};

const userToSignin = {
  email: 'joeatiam@googlemail.com',
  password: '123456',
};

const userWithPassError = {
  firstName: 'Joel',
  lastName: 'Atm',
  email: 'abc@cd.co',
  password: '12345',
  gender: 'male',
};

const token = [];
const fetchToken = (chai, app, signinAddress, done) => {
  chai.request(app)
    .post(signinAddress)
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(userToSignin)
    .then((res) => {
      token.push(res.body.data.token);
    })
    .then(done, done);
};

const checkSignup = (user) => {
  user.should.be.an.object();
  user.status.should.be.an.integer();
  user.message.should.be.a.string();
  user.data.should.be.an.object();
  user.data.token.should.be.a.string();
  user.data.firstname.should.be.a.string();
  user.data.lastname.should.be.a.string();
  user.data.gender.should.be.a.string();
  user.data.email.should.be.a.string();
  (new Date(user.data.joined)).should.be.an.date();
};

const checkSignin = (body) => {
  body.status.should.be.an.integer();
  body.message.should.be.a.string();
  body.data.should.be.an.object();
};

const resStatus = (x) => {
  if (x === `${apiVersion}/auth/signup`) {
    return 201;
  }
  return 200;
};

const testAuth = (chai, app, address, userToSign, done, ...error) => {
  chai.request(app)
    .post(address)
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(userToSign)
    .end((err, res) => {
      if (error.length > 0) {
        res.should.have.status(error[0]);
        res.body.status.should.be.an.integer();
        res.body.error.should.be.a.string();
      } else {
        res.should.have.status(resStatus(address));
        if (resStatus(address) === 201) {
          checkSignup(res.body);
        } else checkSignin(res.body);
      }
      done();
    });
};

export default {
  userToSignup,
  userWithPassError,
  userToSignin,
  testAuth,
  fetchToken,
  token,
};
