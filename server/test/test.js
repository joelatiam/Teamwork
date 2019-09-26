/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsserttypeExtra from 'chai-asserttype-extra';
import app from '../index';
import apiVersion from '../helpers';
import auth from './auth';
import articles from './articles';

chai.should();
chai.use(chaiHttp);
chai.use(chaiAsserttypeExtra);

const signinAddress = `${apiVersion}/auth/signin`;

describe('### Test Authentication ###', () => {
  describe(`POST ${apiVersion}/auth/signup`, () => {
    it('Should return info about the new created account with status: 201', (done) => {
      auth.testAuth(chai, app, `${apiVersion}/auth/signup`, auth.userToSignup, done);
    });
  });
  describe(`POST ${apiVersion}/auth/signin`, () => {
    it('Should return info about the user who has signed in', (done) => {
      auth.testAuth(chai, app, signinAddress, auth.userToSignin, done);
    });
  });
});

describe('### Test About Share and Edit Articles ###', () => {
  before((done) => {
    auth.fetchToken(chai, app, signinAddress, done);
  });

  describe(`POST ${apiVersion}/articles`, () => {
    it('Should return info about the new article: 201', (done) => {
      articles.testWriteArticle(chai, app, `${apiVersion}/articles`, articles.articleToShare, auth.token[0], done);
    });
  });
});
