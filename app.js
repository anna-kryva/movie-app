const express = require('express');
// const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./utils/errorHandler');

const app = express();

// app.use(morgan('dev'));
app.use(express.json({extended: true}));
app.use((err, req, res, next) => {
  errorHandler(res, err);
});
// app.use(cors());

app.use('/api/movies', require('./routes/movies.routes'));
app.use('/api/search', require('./routes/search.routes'));

module.exports = app;
