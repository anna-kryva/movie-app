/* eslint-disable new-cap */
const express = require('express');
const Movie = require('../models/Movie');
const errorHandler = require('../utils/errorHandler');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const title = req.query.title || '';
    const star = req.query.star || '';

    const movies = await Movie.find({
      title: {$regex: title, $options: 'i'},
      stars: {$regex: star, $options: 'i'},
    });

    res.status(200).json({
      status: 'Search completed successfully',
      movies,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
