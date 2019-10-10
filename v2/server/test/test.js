import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsserttypeExtra from 'chai-asserttype-extra';
import tables from '../models/tables';
import app from '../index';
import apiVersion from '../helpers/index';
import auth from './auth';
import articles from './articles';


chai.should();
chai.use(chaiHttp);
chai.use(chaiAsserttypeExtra);

const signinAddress = `${apiVersion}/auth/signin`;

const authentication = () => {
  describe('### Test Authentication ###', () => {
    describe(`POST ${apiVersion}/auth/signup`, () => {
      it('Should return info about the new created account with status: 201', (done) => {
        auth.testAuth(chai, app, `${apiVersion}/auth/signup`, auth.userToSignup, done);
      });
    });

    describe(`POST ${apiVersion}/auth/signup`, () => {
      it('Should return a failed authentication with status: 400', (done) => {
        auth.testAuth(chai, app, `${apiVersion}/auth/signup`, auth.userWithPassError, done, 400);
      });
    });

    describe(`POST ${apiVersion}/auth/signin`, () => {
      before(done => setTimeout(done, 100));

      it('Should return info about the user who has signed in', (done) => {
        auth.testAuth(chai, app, signinAddress, auth.userToSignin, done);
      });
    });
  });
};

const shareEdit = () => {
  describe('### Test About Share and Edit Articles ###', () => {
    before((done) => {
      auth.fetchToken(chai, app, signinAddress, done);
    });

    describe(`POST ${apiVersion}/articles`, () => {
      it('Should return info about the new article: 201', (done) => {
        articles.testWriteArticle(chai, app, `${apiVersion}/articles`, articles.articleToShare, auth.token[0], done);
      });
    });

    describe(`PATCH ${apiVersion}/articles`, () => {
      it('Should return info about the updated article: 201', (done) => {
        articles.testEditArticle(chai, app, `${apiVersion}/articles/6`, articles.articleToShare, auth.token[0], done);
      });
    });
  });
};

const comment = () => {
  describe('### Test About the comment feature ###', () => {
    before((done) => {
      auth.fetchToken(chai, app, signinAddress, done);
    });

    describe(`POST ${apiVersion}/articles/<articleID>/comments`, () => {
      it('Should return info about the new comment: 201', (done) => {
        articles.writeComment(chai, app, `${apiVersion}/articles/5/comments`, articles.commentToShare, auth.token[0], done);
      });
    });
  });
};

const specificArticle = () => {
  describe('### Test About Specific Article, News feed and Delete Article ###', () => {
    before((done) => {
      auth.fetchToken(chai, app, signinAddress, done);
    });

    describe(`GET ${apiVersion}/articles/<articleID>`, () => {
      it('Should return info about a specific article: 200', (done) => {
        articles.specificArticle(chai, app, `${apiVersion}/articles/6`, auth.token[0], done);
      });
    });

    describe(`GET ${apiVersion}/feeds`, () => {
      it('Should return all the Articles: 200', (done) => {
        articles.allArticles(chai, app, `${apiVersion}/feeds`, auth.token[0], done);
      });
    });

    describe(`DELETE ${apiVersion}/articles/<articleID>`, () => {
      it('Should return the confirmation message on deleted article: 200', (done) => {
        articles.deleteArticle(chai, app, `${apiVersion}/articles/6`, auth.token[0], done);
      });
    });
  });
};

describe('### Teamwork API V2 Test', () => {
  before(async () => {
    await tables.createTables();
  });

  authentication();
  // shareEdit();
  // comment();
  // specificArticle();

  after(() => {
     tables.dropTables();
  });
});
