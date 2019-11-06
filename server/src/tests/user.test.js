/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test Suite For User Endpoints', () => {
  let employeeToken;
  let adminToken;

  before(done => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        email: 'anuoluwapoakinseye@gmail.com',
        password: 'secret'
      })
      .end((err, res) => {
        const { token } = res.body.data;
        adminToken = token;
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

  describe('POST /api/v1/auth/signin', () => {
    it('should signin the user if provided credential is valid', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'anuoluwapoakinseye@gmail.com',
          password: 'secret'
        })
        .end((err, res) => {
          res.status.should.be.eql(200);
          res.body.status.should.be.eql('success');
          res.body.data.token.should.be.a('string');
          res.body.data.userId.should.be.a('number');
          done();
        });
    });
    it('should return error if user email is valid but does not exist', done => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'anuoluseye@gmail.com',
          password: 'secret'
        })
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if provided user email address is invalid', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'anuoluwapoakinseye.com',
          password: 'secret'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
        });
    });
    it('should return error if provided user email address field is empty', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: '',
          password: 'secret'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
        });
    });
    it('should return error if provided user password field is empty', () => {
      chai
        .request(server)
        .post('/api/v1/auth/signin')
        .send({
          email: 'anuoluwapoakinseye@gmail.com',
          password: ''
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
        });
    });
  });
  describe('POST /api/v1/auth/create-user', () => {
    it('should create the user if provided credential is valid', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(201);
          res.body.status.should.be.eql('success');
          res.body.data.token.should.be.a('string');
          res.body.data.userId.should.be.a('number');
          res.body.data.message.should.be.eql('User account successfully created');
          done();
        });
    });
    it('should return error if provided token is for employee', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${employeeToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamesbond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if token is not provided', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: '' })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(401);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if firstname field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: '',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if firstname field is non-alphabeltic', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: '123',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });

    it('should return error if lastname field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: '',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if lastname field is non-alphabeltic', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: '123',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if email field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: '',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if email field is invalid', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if email is already taken', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'anuoluwapoakinseye@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(409);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if password field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: '',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if password field is less than six characters', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secre',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if gender field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: '',
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if gender field is non-alphabeltic', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 123,
          jobRole: 'accountant',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if jobRole field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: '',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if jobRole field is non-alphabeltic', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: '123m',
          department: 'accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if department field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: '',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if department field is non-alphabeltic', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: '123accounting',
          address: '22, jamebond street, london'
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
    it('should return error if address field is empty', done => {
      chai
        .request(server)
        .post('/api/v1/auth/create-user')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send({
          firstName: 'john',
          lastName: 'bull',
          email: 'johnbull@gmail.com',
          password: 'secret',
          gender: 'male',
          jobRole: 'accountant',
          department: 'accounting',
          address: ''
        })
        .end((err, res) => {
          res.status.should.be.eql(422);
          res.body.status.should.be.eql('error');
          res.body.message.should.be.a('string');
          done();
        });
    });
  });
});
