const fs = require('fs')

function filesWriter (options) {
  function writeFile (file) {
    return new Promise((resolve, reject) => {
      fs.createWriteStream(file.path)
        .write(file.content)
        .end()
        .on('finish', resolve)
        .on('error', e => {
          if (e.code === 'ENOENT') {
            return reject(`No such file: ${file.path}`) // eslint-disable-line
          }

          return reject(e)
        })
    })
  }

  const writePromises = options.files.map(writeFile)

  writePromises.push(writeFile(options.style))

  return Promise.all(writePromises)
}

module.exports = filesWriter