import config from 'config';
import { connect } from 'mongoose';
import app from './app';

const PORT = config.get('port') || 5000;

// eslint-disable-next-line require-jsdoc
(async function start() {
  try {
    await connect(config.get('mongoURI'), {
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

export default app;
