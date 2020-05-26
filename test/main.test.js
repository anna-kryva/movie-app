const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const getMovies = require('./suites/getMovies');
const addMovieFromJson = require('./suites/addMovieFromJson');
const getMovieById = require('./suites/getMovieById');
const deleteMovie = require('./suites/deleteMovie');
const searchTitleField = require('./suites/searchTitleFields');
const searchStarsField = require('./suites/searchStarsField');
const addMovieFromFile = require('./suites/addMovieFromFile');

const moviesToPost = require('./moviesToPost');

chai.use(chaiHttp);

describe('Movies', () => {
  before((done) => {
    server.on('ready', () => {
      done();
    });
  });

  getMovies(moviesToPost.sortedMovies);
  addMovieFromJson(
      moviesToPost.validNewMovie,
      moviesToPost.invalidNewMovie,
  );
  getMovieById(moviesToPost.toGetIdMovie);
  deleteMovie(moviesToPost.toDeleteMovie);
  searchTitleField();
  searchStarsField();
  addMovieFromFile();
});
