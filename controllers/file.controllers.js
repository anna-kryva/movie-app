const fs = require('fs');
const Movie = require('../models/Movie');
const errorHandler = require('../utils/errorHandler');
const toJsonDocuments = require('../utils/toJsonDocuments');

module.exports.addMoviesFromFile = (req, res) => {
  const stream = new fs.ReadStream(req.file.path, {encoding: 'UTF-8'});

  stream.on('error', (error) => {
    if (error.code === 'ENOENT') {
      errorHandler(res, new Error('No such file or directory'));
    } else {
      errorHandler(res, error);
    }
  });

  let extra = '';
  stream.on('readable', async () => {
    let data = stream.read();
    data = extra + data;

    if (!data) return;
    if (data.slice(data.length - 2, data.length) != '\n\n') {
      const lineEndIndex = data.lastIndexOf('\n\n');

      extra = data.slice(lineEndIndex + 1);
      data = data.slice(0, lineEndIndex+1);
    } else {
      extra = '';
    }

    const documents = toJsonDocuments(data);
    await Movie.insertMany(documents);
  });

  stream.on('end', () => {
    res.status(200).json({
      status: 'Movies added successfully',
    });
  });
};
