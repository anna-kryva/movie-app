const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Movie = require('../../models/Movie');

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

module.exports = (movie) => {
  let docId;
  describe('/GET/:id movies', () => {
    it('should GET a movie by the given id', async () => {
      const savedMovie = await new Movie(movie).save();
      docId = savedMovie.id;
      const res = await chai.request(server)
          .get('/api/movies/' + docId);

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.movie.should.have.property('title');
      res.body.movie.should.have.property('releaseYear');
      res.body.movie.should.have.property('format');
      res.body.movie.should.have.property('stars');
      res.body.movie.should.have.property('_id').eql(savedMovie.id);
    });

    it('should not GET an unexisted movie', async () => {
      await Movie.findByIdAndDelete(docId);

      const res = await chai.request(server)
          .get('/api/movies/' + docId);

      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('No such movie');
    });
  });
};
