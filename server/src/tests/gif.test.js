/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For Gif Endpoints', () => {
  let employeeToken;
  let employee2Token;
  let newGifId;
  let newGifId2;

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
        employee2Token = token;
        done();
      });
  });

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

  before(done => {
    chai
      .request(server)
      .post('/api/v1/gifs')
      .set('Authorization', `Bearer ${employeeToken}`)
      .type('form')
      .attach('image', './server/src/tests/images/weekend.gif')
      .field('title', 'weekend is approaching')
      .end((err, res) => {
        newGifId = res.body.data.gifId;
        done();
      });
  });

  before(done => {
    chai
      .request(server)
      .post('/api/v1/gifs')
      .set('Authorization', `Bearer ${employeeToken}`)
      .type('form')
      .attach('image', './server/src/tests/images/weekend.gif')
      .field('title', 'weekend is approaching')
      .end((err, res) => {
        newGifId2 = res.body.data.gifId;
        done();
      });
  });

  describe('POST /api/v1/gifs', () => {
    it('should create a gif if provided data is valid', done => {
      chai
        .request(server)
        .post('/api/v1/gifs')
        .set('Authorization', `Bearer ${employeeToken}`)
        .type('form')
        .attach('image', './server/src/tests/images/weekend.gif')
        .field('title', 'weekend is approaching')
        .end((err, res) => {
          res.status.should.be.eql(201);
          res.body.status.should.be.eql('success');
          res.body.data.should.have.keys('message', 'gifId', 'title', 'imageUrl', 'createdOn');
          res.body.data.message.should.be.eql('GIF image successfully posted');
          res.body.data.gifId.should.be.a('number');
          res.body.data.title.should.be.a('string');
          res.body.data.imageUrl.should.be.a('string');
          done();
        });
    });
    it('should return error if token is not provided', done => {
      chai
        .request(server)
        .post('/api/v1/gifs')
        .set('Authorization', '')
        .type('form')
        .attach('image', './server/src/tests/images/weekend.gif')
        .field('title', 'weekend is approaching')
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if image is not in gif format', done => {
      chai
        .request(server)
        .post('/api/v1/gifs')
        .set('Authorization', `Bearer ${employeeToken}`)
        .type('form')
        .attach('image', './server/src/tests/images/weekend.jpg')
        .field('title', 'weekend is approaching')
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if image field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/gifs')
        .set('Authorization', `Bearer ${employeeToken}`)
        .type('form')
        .attach('image', '')
        .field('title', 'weekend is approaching')
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if title field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/gifs')
        .set('Authorization', `Bearer ${employeeToken}`)
        .type('form')
        .attach('image', './server/src/tests/images/weekend.gif')
        .field('title', '')
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
  describe('DELETE /api/v1/gifs/<:gifId>', () => {
    it('should delete gif image post if gifId and token exist', done => {
      chai
        .request(server)
        .delete(`/api/v1/gifs/${newGifId}`)
        .set('Authorization', `Bearer ${employeeToken}`)
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.status.should.be.eql('success');
          res.body.data.message.should.be.eql('GIF post successfully deleted');
          res.body.data.gifId.should.be.a('number');
          done();
        });
    });
    it('should return error if no token is provided', done => {
      chai
        .request(server)
        .delete(`/api/v1/gifs/${newGifId2}`)
        .set('Authorization', '')
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if gifId does not exist', done => {
      chai
        .request(server)
        .delete(`/api/v1/gifs/100000`)
        .set('Authorization', `Bearer ${employeeToken}`)
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
    it('should return error if user try to delete colleague gif post', done => {
      chai
        .request(server)
        .delete(`/api/v1/gifs/${newGifId2}`)
        .set('Authorization', `Bearer ${employee2Token}`)
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.error.should.be.a('string');
          done();
        });
    });
  });
});
