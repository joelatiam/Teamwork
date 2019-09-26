/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsserttypeExtra from 'chai-asserttype-extra';
import app from '../index';
import apiVersion from '../helpers';
import auth from './auth';

chai.should();
chai.use(chaiHttp);
chai.use(chaiAsserttypeExtra);

describe('### Test Authentication ###', () => {
  describe(`POST ${apiVersion}/auth/signup`, () => {
    it('Should return info about the new created account with status: 201', (done) => {
      auth.testAuth(chai, app, `${apiVersion}/auth/signup`, auth.userToSignup, done);
    });
  });
  describe(`POST ${apiVersion}/auth/signin`, () => {
    it('Should return info about the user who has signed in', (done) => {
      auth.testAuth(chai, app, `${apiVersion}/auth/signin`, auth.userToSignin, done);
    });
  });
});
