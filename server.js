const mongoose = require('mongoose');
const app = require('./app');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const env = process.env.NODE_ENV;
const envString = env.toUpperCase();

const PORT = process.env['PORT_' + envString];

// eslint-disable-next-line require-jsdoc
(async () => {
  try {
    await mongoose.connect(process.env['MONGO_URI_' + envString], {
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
