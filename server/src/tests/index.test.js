/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For Entry File Endpoints', () => {
  describe('GET /', () => {
    it('should return welcome message if endpoint exist', done => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.status.should.be.eql('success');
          res.body.data.message.should.be.eql('Welcome to Teamwork App!');
          done();
        });
    });
    it('should return error if route does not exist', () => {
      chai
        .request(server)
        .get('/notfound')
        .end((err, res) => {
          res.status.should.be.eql(404);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.eql('Route Does not Exist');
        });
    });
  });
});
