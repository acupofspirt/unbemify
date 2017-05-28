const path = require('path'),
      fs = require('fs');

/** @todo Change arguments with options */
function filesReader (paths) {
  const rootPath = process.cwd();

  return paths.map(filePath => new Promise((resolve, reject) => {
    const absoluteFilePath = path.resolve(rootPath, filePath);
    let readedFile = '';

    fs.createReadStream(absoluteFilePath, {encoding: 'utf-8'})
      .on('data', chunk => {readedFile += chunk;})
      .on('end', () => resolve(readedFile))
      .on('error', e => {
        if (e.code === 'ENOENT') {
          return reject(`No such file: ${filePath}`);
        }
        else {
          return reject(e);
        }
      });
  }));
}

module.exports = filesReader;