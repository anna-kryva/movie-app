const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Movie = require('../../models/Movie');

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

module.exports = () => {
  describe('/GET search title', () => {
    it('should GET all movies without condition on title',
        async () => {
          const movies = await Movie.find({});
          const res = await chai.request(server)
              .get('/api/search?title=');

          res.should.have.status(200);
          res.body.movies.should.have.lengthOf(movies.length);
        });

    it('should GET movies using title search', async () => {
      const condition = 'third';
      const expectedMovies = await Movie.find({
        title: {$regex: condition, $options: 'i'},
      });
      const res = await chai.request(server)
          .get('/api/search?title=' + condition);

      res.should.have.status(200);
      res.body.movies.should.have.lengthOf(expectedMovies.length);
    });
  });
};
