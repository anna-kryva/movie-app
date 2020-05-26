const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Movie = require('../../models/Movie');

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

module.exports = (movie) => {
  describe('/DELETE/:id movies', () => {
    it('should DELETE movie by the given id', async () => {
      const savedMovie = await new Movie(movie).save();
      const res = await chai.request(server)
          .delete('/api/movies/' + savedMovie.id);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status')
          .eql('Movie deleted successfully');
    });
  });
};
