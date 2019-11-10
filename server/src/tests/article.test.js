/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For Article Endpoints', () => {
  let employeeToken;

  before(done => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'bidemikarunwi@gmail.com',
        password: 'secret'
      })
      .end((err, res) => {
        const { token } = res.body.data;
        employeeToken = token;
        done();
      });
  });

  describe('POST /api/v1/articles', () => {
    it('should post an article if token and other data are valid', done => {
      chai
        .request(server)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          title: 'basic in accounting',
          article:
            'asset can basically be describe as those thing that brings money/value to the company'
        })
        .end((err, res) => {
          res.status.should.be.eql(201);
          res.body.status.should.be.eql('success');
          res.body.data.should.have.keys('articleId', 'createdOn', 'title');
          res.body.data.articleId.should.be.a('number');
          res.body.data.title.should.be.a('string');
          done();
        });
    });
    it('should return error if no token is provided', done => {
      chai
        .request(server)
        .post('/api/v1/articles')
        .set('Authorization', '')
        .send({
          title: 'basic in accounting',
          article: 'debt can basically be describe as the money you borrowed and are yet to return'
        })
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if title field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          title: '',
          article: 'debt can be basically be describe as the money you borrowed and not yet return'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if article field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/articles')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send({
          title: 'basic in accounting',
          article: ''
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
  describe('GET /api/v1/articles/<:article>', () => {
    it('should view specific article if token and article ID exist', done => {
      chai
        .request(server)
        .get('/api/v1/articles/1')
        .set('Authorization', `Bearer ${employeeToken}`)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.status.should.be.eql('success');
          res.body.data.should.have.keys('id', 'createdOn', 'title', 'article', 'comments');
          res.body.data.id.should.be.a('number');
          res.body.data.title.should.be.a('string');
          res.body.data.article.should.be.an('string');
          res.body.data.comments[0].commentId.should.be.a('number');
          res.body.data.comments[0].comment.should.be.a('string');
          res.body.data.comments[0].authorId.should.be.a('number');
          done();
        });
    });
    it('should return error if no token is provided', done => {
      chai
        .request(server)
        .get('/api/v1/articles/1')
        .set('Authorization', '')
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if article ID is non-numeric', done => {
      chai
        .request(server)
        .get('/api/v1/articles/me')
        .set('Authorization', `Bearer ${employeeToken}`)
        .end((err, res) => {
          res.status.should.be.eql(403);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if article ID is does not exist', done => {
      chai
        .request(server)
        .get('/api/v1/articles/1000000')
        .set('Authorization', `Bearer ${employeeToken}`)
        .end((err, res) => {
          res.status.should.be.eql(404);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
});
