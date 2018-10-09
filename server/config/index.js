const path = require('path');

require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  serverHost: process.env.SERVER_HOST || '0.0.0.0',
  port: process.env.SERVER_PORT || 3001,
  s3: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET_NAME,
  },
  tempDir: {
    path: path.join(__dirname, '../../public/temp'),
    uri: '/temp',
  },
};

module.exports = config;
