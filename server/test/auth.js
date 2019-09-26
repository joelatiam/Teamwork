import apiVersion from '../helpers';

const userToSignup = {
  firstName: 'Joel',
  lastName: 'Atm',
  email: 'abc@cd.co',
  password: '123456',
  gender: 'male',
  jobRole: 'Software Engineer',
  department: 'IT',
  address: '12 Av du Palmier, Kisangani',
};

const checkSignup = (user) => {
  user.should.be.an.object();
  user.status.should.be.an.integer();
  user.message.should.be.a.string();
  user.data.should.be.an.array();
  user.data[0].token.should.be.a.string();
  user.data[1].Name.should.be.a.string();
  user.data[1].email.should.be.a.string();
  user.data[1].role.should.be.a.string();
  (new Date(user.data[1].joined)).should.be.an.date();
};

// const checkSignin = (res) => {
//   const body = res.body[0];
//   if (body) {
//     // console.log('Response Body:', body['access key']);
//     body['access key'].should.be.a.string();
//   }
//   const body2 = res.body[1];
//   if (body2) {
//     // console.log('Response Body:', body['access key']);
//     body2['first name'].should.be.a.string();
//     body2['last name'].should.be.a.string();
//   }
// };

const resStatus = (x) => {
  //   status 201 for signup or 202 for signin
  if (x === `${apiVersion}/auth/signup`) return 201;
  return 200;
};

const testAuth = (chai, app, address, userToSign, done) => {
  chai.request(app)
    .post(address)
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(userToSign)
    .end((err, res) => {
      res.should.have.status(resStatus(address));
      if (resStatus(address) === 201) {
        checkSignup(res.body);
      }
      //   else {
      //     checkSignin(res);
      //   }
      console.log('body: ', res.body);
      console.log(address);
      done();
    });
};

export default {
  userToSignup,
  testAuth,
};
