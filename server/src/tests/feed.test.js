/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For Feed Endpoints', () => {
  let employeeToken;

  before(done => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'teebae@gmail.com',
        password: 'secret'
      })
      .end((err, res) => {
        const { token } = res.body.data;
        employeeToken = token;
        done();
      });
  });

  describe('POST /api/v1/feed', () => {
    it('should fetch all avalailable post(article/gif) on the platform if token is provide', done => {
      chai
        .request(server)
        .get('/api/v1/feed')
        .set('Authorization', `Bearer ${employeeToken}`)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.status.should.be.eql('success');
          res.body.data[0].id.should.be.a('number');
          res.body.data[0].authorId.should.be.a('number');
          res.body.data[0].title.should.be.a('string');
          done();
        });
    });
    it('should return error if token is not provided', done => {
      chai
        .request(server)
        .get('/api/v1/feed')
        .set('Authorization', '')
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
});
