const errorHandler = require('../utils/errorHandler');

module.exports = (schema, property) => {
  return async (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const validation = await schema.validate(req[property]);
      if (validation.error) {
        return errorHandler(
            res,
            new Error(validation.error.details[0].message),
        );
      }
      next();
    } catch (error) {
      errorHandler(res, error);
    }
  };
};
