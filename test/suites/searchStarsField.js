const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Movie = require('../../models/Movie');

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

module.exports = () => {
  describe('/GET search stars', () => {
    it('should GET all movies without condition on stars',
        async () => {
          const movies = await Movie.find({});
          const res = await chai.request(server)
              .get('/api/search?stars=');

          res.should.have.status(200);
          res.body.movies.should.have.lengthOf(movies.length);
        });

    it('should GET movies using stars search', async () => {
      const condition = 'Test';
      const expectedMovies = await Movie.find({
        stars: {$regex: condition, $options: 'i'},
      });

      const res = await chai.request(server)
          .get('/api/search?star=' + condition);

      res.should.have.status(200);
      res.body.movies.should.have.lengthOf(expectedMovies.length);
    });
  });
};
