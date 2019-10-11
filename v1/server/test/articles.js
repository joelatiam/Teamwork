const articleToShare = {
  title: 'Testing with Chai',
  topic: 3,
  article: 'This is an article',
};

const commentToShare = {
  comment: 'This is my Comment',
};

const checkArticle = (body) => {
  body.should.be.an.object();
  body.status.should.be.an.integer();
  body.message.should.be.a.string();
  body.article.should.be.an.object();
  body.article.id.should.be.an.integer();
  (new Date(body.article.date)).should.be.a.date();
  body.article.article.should.be.a.string();
  body.article.author.should.be.an.integer();
};

const checkComment = (body) => {
  body.should.be.an.object();
  body.status.should.be.an.integer();
  body.message.should.be.a.string();
  body.data.should.be.an.object();
  body.data.id.should.be.an.integer();
  (new Date(body.data.date)).should.be.a.date();
  body.data.comment.should.be.a.string();
  body.data['Article ID'].should.be.an.integer();
  body.data['Article Title'].should.be.a.string();
  body.data['Article Author'].should.be.an.integer();
};

const checkDeletion = (body) => {
  body.should.be.an.object();
  body.status.should.be.an.integer();
  body.message.should.be.a.string();
};

const testWriteArticle = (chai, app, address, toShare, token, done) => {
  chai.request(app)
    .post(address)
    .set({ Authorization: `bearer ${token}` })
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(toShare)
    .end((err, res) => {
      res.should.have.status(201);
      checkArticle(res.body);
      done();
    });
};

const testEditArticle = (chai, app, address, toShare, token, done) => {
  chai.request(app)
    .patch(address)
    .set({ Authorization: `bearer ${token}` })
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(toShare)
    .end((err, res) => {
      res.should.have.status(201);
      checkArticle(res.body);
      done();
    });
};

const writeComment = (chai, app, address, toShare, token, done) => {
  chai.request(app)
    .post(address)
    .set({ Authorization: `bearer ${token}` })
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(toShare)
    .end((err, res) => {
      res.should.have.status(201);
      checkComment(res.body);
      done();
    });
};

const specificArticle = (chai, app, address, token, done) => {
  chai.request(app)
    .get(address)
    .set({ Authorization: `bearer ${token}` })
    .set('content-type', 'application/x-www-form-urlencoded')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
};

const deleteArticle = (chai, app, address, token, done) => {
  chai.request(app)
    .delete(address)
    .set({ Authorization: `bearer ${token}` })
    .set('content-type', 'application/x-www-form-urlencoded')
    .end((err, res) => {
      res.should.have.status(200);
      checkDeletion(res.body);
      done();
    });
};

const allArticles = (chai, app, address, token, done) => {
  chai.request(app)
    .get(address)
    .set({ Authorization: `bearer ${token}` })
    .set('content-type', 'application/x-www-form-urlencoded')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
};

export default {
  articleToShare,
  testWriteArticle,
  specificArticle,
  allArticles,
  commentToShare,
  writeComment,
  deleteArticle,
  testEditArticle,
};
