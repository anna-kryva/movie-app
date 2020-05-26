const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

module.exports = (validNewMovie, invalidNewMovie) => {
  describe('/POST movies', () => {
    it('should POST a movie', async () => {
      const res = await chai.request(server)
          .post('/api/movies')
          .send(validNewMovie);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status')
          .eql('Movie added successfully');
    });

    it('should not POST a movie already existed', async () => {
      const res = await chai.request(server)
          .post('/api/movies')
          .send(validNewMovie);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status')
          .eql('Movie is already existed');
    });

    it('should not POST a movie with invalid data', async () => {
      const res = await chai.request(server)
          .post('/api/movies')
          .send(invalidNewMovie);

      res.should.have.status(500);
      res.body.should.be.a('object');
      res.body.should.have.property('success').be.false;
    });
  });
};
