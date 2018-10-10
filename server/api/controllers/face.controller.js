const fs = require('fs');
const JSZip = require('jszip');
const config = require('../../config');
const { handler: errorHandler } = require('../middlewares/error');
const { listDirectory, getObject } = require('../utils/S3Client');

exports.load = async (req, res, next) => {
  try {
    const s3ListParams = {
      Bucket: config.s3.bucket,
      Delimiter: '/',
    };
    const data = await listDirectory(s3ListParams);
    const listZipFiles = data.Contents.sort((a, b) => b.LastModified - a.LastModified);
    const lastFile = req.app.get('last_file');
    const currentFile = req.app.get('current_file');
    let nextFile;
    if (listZipFiles.length > 0) {
      if (!lastFile || (lastFile.LastModified < listZipFiles[0].LastModified && lastFile.Key !== listZipFiles[0].Key)) {
        nextFile = listZipFiles[0];
        req.app.set('last_file', nextFile);
        req.app.set('current_file', nextFile);
      } else {
        nextFile = listZipFiles.find(z => z.LastModified < currentFile.LastModified);
        if (!nextFile && lastFile) {
          nextFile = lastFile;
        }
        req.app.set('current_file', nextFile);
      }
    }
    const dirName = nextFile.Key.split('.').slice(0, -1).join('.');
    const dirPath = `${config.tempDir.path}/${dirName}`;
    if (!fs.existsSync(dirPath)) {
      const s3GetParams = {
        Bucket: config.s3.bucket,
        Key: nextFile.Key,
      };
      const faceZipFile = await getObject(s3GetParams);
      fs.mkdirSync(dirPath);
      const jszip = new JSZip();
      const zipContent = await jszip.loadAsync(faceZipFile.Body);
      for(let filename of Object.keys(zipContent.files)) {
        const fileContent = await jszip.file(filename).async('nodebuffer');
        const destFile = `${dirPath}/${filename}`;
        fs.writeFileSync(destFile, fileContent);
      }
    }
    return res.json({
      path: `http://${config.serverHost}${config.port === 80 ? '' : ':' + config.port}${config.tempDir.uri}/${dirName}/`,
      thumbnail: 'thumbnail.jpg',
      img: 'head_mesh.jpg',
      obj: 'head_mesh.obj',
      mtl: 'head_mesh.mtl',
      name: dirName,
    });
  } catch (error) {
    return next(error);
  }
};
