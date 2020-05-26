module.exports = (res, error, code = 500) => {
  res.status(code).json({
    success: false,
    status: error.message ? error.message : error,
  });
};
