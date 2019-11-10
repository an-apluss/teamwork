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
          res.body.data.artile.should.be.an('string');
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
          res.body.status.should.be.eql('success');
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
          res.body.status.should.be.eql('success');
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
          res.body.status.should.be.eql('success');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
});
