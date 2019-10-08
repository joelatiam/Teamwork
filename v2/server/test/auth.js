import apiVersion from '../helpers/index';

const userToSignup = {
  firstName: 'Joel',
  lastName: 'Atm',
  email: 'joatB@dcd.co',
  password: '123456',
  gender: 'male',
  jobRole: 'Software Engineer',
  department: 'IT',
  address: '12 Av du Palmier, Kisangani',
};

const userWithPassError = {
  firstName: 'Joel',
  lastName: 'Atm',
  email: 'abzsvjcV@cd.co',
  password: '12345',
  gender: 'male',
};

const userToSignin = {
  email: 'joelatiam@googlemail.com',
  password: '123456',
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
  user.data.firstName.should.be.a.string();
  user.data.lastName.should.be.a.string();
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
  if (x.includes('signup')) {
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
      res.should.have.status(201);

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
