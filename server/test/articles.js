const articleToShare = {
  title: 'Testing with Chai',
  topic: 3,
  article: 'This is an article',
};

const checkNewArticle = (message) => {
  message.should.be.an.object();
  message.status.should.be.an.integer();
  message.message.should.be.a.string();
  message.article.should.be.an.object();
  message.article.id.should.be.an.integer();
  (new Date(message.article.date)).should.be.a.date();
  message.article.title.should.be.a.string();
  message.article.article.should.be.a.string();
  message.article.author.should.be.a.string();
  message.article.topic.should.be.an.integer();
};

const testWriteArticle = (chai, app, address, toShare, token, done) => {
  chai.request(app)
    .post(address)
    .set({ Authorization: `bearer ${token}` })
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(toShare)
    .end((err, res) => {
      res.should.have.status(201);
      checkNewArticle(res.body);
      console.log('body: ', res.body);
      console.log(address);
      done();
    });
};


export default {
  articleToShare,
  testWriteArticle,
};
