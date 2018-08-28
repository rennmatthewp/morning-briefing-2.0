const chai = requre('chai');
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
});
