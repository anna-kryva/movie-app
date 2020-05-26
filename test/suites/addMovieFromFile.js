const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Movie = require('../../models/Movie');

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

module.exports = () => {
  describe('/POST movies from file', () => {
    before(async () => {
      await Movie.deleteMany({});
    });

    it('should POST a movie', async () => {
      const res = await chai.request(server)
          .post('/api/movies/file')
          .set(
              'Content-Type',
              'application/x-www-form-urlencoded',
          )
          .attach('file',
              'uploads/sample_movies_little.txt',
              'sample_movies_little.txt',
          );

      const movies = await Movie.find({});

      res.should.have.status(200);
      res.body.should.have.property('status')
          .eql('Movies added successfully');
      movies.should.have.lengthOf(5);
    });
  });
};
