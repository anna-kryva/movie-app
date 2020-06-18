const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const errorHandler = require('./utils/errorHandler');

const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs/access.log'),
    {flags: 'a'},
);
app.use(morgan('dev', {stream: accessLogStream}));

app.use(express.json({extended: true}));
app.use((err, req, res, next) => {
  errorHandler(res, err);
});
app.use(cors());

app.use('/api/movies', require('./routes/movies.routes'));
app.use('/api/search', require('./routes/search.routes'));

module.exports = app;
