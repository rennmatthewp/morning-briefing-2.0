const chai = require('chai');
const chaiHttp = require('chai-http');

const { database } = require('../routes/apiRoutes');
const server = require('../server');

const should = chai.should();
chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        database.seed.run().then(() => {
          done();
        });
      });
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return an array of users', done => {
      chai
        .request(server)
        .get('/api/v1/users')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.have.property('id', 1);
          done();
        });
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return a single users by their id', done => {
      chai
        .request(server)
        .get('/api/v1/users/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('id', 1);
          response.body.should.have.property('email', 'yo@yoma.com');
          response.body.should.have.property('firstName', 'yo');
          response.body.should.have.property('lastName', 'yoma');
          done();
        });
    });

    it('should return an error with status 404 if the user is not found', done => {
      chai.request(server)
      .get('/api/v1/users/500')
      .end((error, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.have.property('error', 'Could not find user with id: 500.');
        done();
      })   
    });
  });
});
