const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const config = require('./index');
const routes = require('../api/routes/v1');
const error = require('../api/middlewares/error');

const app = express();

app.use(logger(config.env === 'development' ? 'dev' : 'combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

app.use(helmet());

app.use(cors());

app.use('/api/v1', routes);

if (config.env === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')));
  app.use(config.tempDir.uri, express.static(path.join(__dirname, '../../build/temp')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  app.use(config.tempDir.uri, express.static(config.tempDir.path));
}

app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

module.exports = app;
