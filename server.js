const config = require('config');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = config.get('port') || 5000;

// eslint-disable-next-line require-jsdoc
(async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}`);
      app.emit('ready');
    });
  } catch (error) {
    process.exit(1);
  }
})();

module.exports = app;
