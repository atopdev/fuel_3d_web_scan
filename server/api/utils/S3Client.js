const S3 = require('aws-sdk/clients/s3');
const config = require('../../config');

const S3Client = new S3({
  secretAccessKey: config.s3.secretAccessKey,
  accessKeyId: config.s3.accessKeyId,
  region: config.s3.region,
  httpOptions: {
    timeout: 6000,
    agent: false,
  },
});

exports.listDirectory = params => {
  return new Promise ((resolve, reject) => {
    S3Client.listObjectsV2(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

exports.getObject = params => {
  return new Promise ((resolve, reject) => {
    S3Client.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};
