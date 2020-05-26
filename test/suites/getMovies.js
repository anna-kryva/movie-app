const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Movie = require('../../models/Movie');

chai.use(chaiHttp);

// eslint-disable-next-line no-unused-vars
const should = chai.should();

const sortMovies = (array) => {
  return array.sort((movie1, movie2) => {
    const key1 = movie1.title;
    const key2 = movie2.title;

    return key1.localeCompare(key2);
  });
};

module.exports = (movies) => {
  before(async () => {
    await Movie.deleteMany({});
  });

  describe('/GET movies', () => {
    it('should GET all movies', (done) => {
      chai.request(server)
          .get('/api/movies')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.movies.should.be.a('array');
            res.body.movies.should.have.lengthOf(0);
          });
      done();
    });
  });

  describe('/GET movies', () => {
    it('should GET all movies sorted by title', async () => {
      await Movie.insertMany(movies);
      const res = await chai.request(server)
          .get('/api/movies');
      const sortedMovies = sortMovies(movies);
      res.should.have.status(200);
      res.body.movies[0].title.should.be
          .eql(sortedMovies[0].title);
    });
  });
};
