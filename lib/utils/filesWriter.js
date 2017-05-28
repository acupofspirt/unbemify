const path = require('path'),
      fs = require('fs');

function filesWriter (options) {
  const rootPath = process.cwd();

  function updateFile (file) {
    return new Promise((resolve, reject) => {
      const absoluteFilePath = path.resolve(rootPath, file.path);

      fs.truncate(absoluteFilePath, err => {
        if (err) {
          reject(err);
        }

        const wstream = fs.createWriteStream(absoluteFilePath);

        wstream.write(file.content);
        wstream.end();
        wstream.on('finish', () => resolve());
      });
    });
  }

  const promises = options.files
    .map(file => updateFile(file));

  promises.push(updateFile(options.style));

  return Promise.all(promises);
}

module.exports = filesWriter;