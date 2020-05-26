const errorHandler = require('../utils/errorHandler');

const HasContentType = (type) => {
  return HasContentType[type] ||
    (HasContentType[type] = (req, res, next) => {
      if (req.method === 'OPTIONS') {
        return next();
      }

      const contentType = req.headers['content-type'];

      if (!contentType || contentType.indexOf(type) !== 0) {
        return errorHandler(res, new Error('Incorrect content-type'), 415);
      }

      next();
    });
};

module.exports = HasContentType;
