/* eslint-disable new-cap */
const express = require('express');
const movieController = require('../controllers/movies.controllers');
const fileController = require('../controllers/file.controllers');
const HasContentType = require('../middleware/content-type.middleware');
const schemas = require('../validation/movies.schemas');
const validator = require('../middleware/schemas.middleware');
const upload = require('../middleware/upload.middleware');

const jsonContentType = HasContentType('application/json');
const formDataContentType = HasContentType('multipart/form-data');

const router = express.Router();

router.get(
    '/',
    movieController.getMovies,
);

router.get(
    '/:id',
    validator(schemas.paramsCheckForm, 'params'),
    movieController.getMovieById,
);

router.post(
    '/',
    jsonContentType,
    validator(schemas.createForm, 'body'),
    movieController.addMovieFromJSON,
);

router.post(
    '/file',
    formDataContentType,
    upload.single('file'),
    fileController.addMoviesFromFile,
);

router.delete(
    '/:id',
    validator(schemas.paramsCheckForm, 'params'),
    movieController.deleteMovie,
);

module.exports = router;
