const path = require('path'),
      fs = require('fs');

function filesReader (options) {
  const rootPath = process.cwd();

  function readFile (file) {
    return new Promise((resolve, reject) => {
      const absoluteFilePath = path.resolve(rootPath, file.path);
      let readedFile = '';

      fs.createReadStream(absoluteFilePath, {encoding: 'utf-8'})
        .on('data', chunk => {readedFile += chunk;})
        .on('end', () => resolve(readedFile))
        .on('error', e => {
          if (e.code === 'ENOENT') {
            return reject(`No such file: ${file.path}`);
          }
          else {
            return reject(e);
          }
        });
    })
      .then(content => {
        file.content = content;
        file.size = content.size;
      });
  }

  const readPromises = options.files
    .map(file => readFile(file));

  readPromises.push(readFile(options.style));

  return Promise.all(readPromises);
}

module.exports = filesReader;