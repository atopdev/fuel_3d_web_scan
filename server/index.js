const config = require('./config');
const app = require('./config/express');
const server = require('http').createServer(app);

server.listen(config.port, config.host, () => {
  console.log('--');
  console.info('The API server for Fuel3D demo');
  console.log();
  console.info(`Environment:       ${config.env}`);
  console.info(`Server:            ${config.host}:${config.port}`);
  console.log('--');
});

module.exports = app;
