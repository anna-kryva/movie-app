const Movie = require('../models/Movie');
const errorHandler = require('../utils/errorHandler');

module.exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).sort('title');

    res.status(200).json({
      status: 'Movies uploaded successfully',
      movies,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(400).json({
        status: 'No such movie',
      });
    }

    res.status(200).json({
      status: 'Success',
      movie,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.addMovieFromJSON = async (req, res) => {
  try {
    const {title, releaseYear, format} = req.body;
    const stars = req.body.stars.split(', ');

    const candidate = {title, releaseYear, format, stars};

    const movie = await Movie.findOne(candidate);

    if (movie) {
      return res.status(400).json({status: 'Movie is already existed'});
    }

    const newMovie = new Movie(candidate);
    await newMovie.save();

    res.status(200).json({
      status: 'Movie added successfully',
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);

    return res.status(200).json({status: 'Movie deleted successfully'});
  } catch (error) {
    errorHandler(res, error);
  }
};
