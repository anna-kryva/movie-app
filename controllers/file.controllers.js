const fs = require('fs');
const Movie = require('../models/Movie');
const errorHandler = require('../utils/errorHandler');
const toJsonDocuments = require('../utils/toJsonDocuments');

module.exports.addMoviesFromFile = (req, res) => {
  const stream = new fs.ReadStream(req.file.path, {encoding: 'UTF-8'});

  stream.on('readable', async () => {
    let data = stream.read();

    if (data) {
      if (data[data.length - 1] != '\n') {
        const lineEndIndex = data.lastIndexOfEnd('\n');
        data = data.slice(0, lineEndIndex);
        const extra = data.slice(lineEndIndex + 1);
        stream.unshift(extra);
      }

      const documents = toJsonDocuments(data);
      await Movie.insertMany(documents);
    }
  });

  stream.on('end', () => {
    res.status(200).json({
      status: 'Movies added successfully',
    });
  });

  stream.on('error', (error) => {
    if (error.code === 'ENOENT') {
      errorHandler(res, new Error('No such file or directory'));
    } else {
      errorHandler(res, error);
    }
  });
};
