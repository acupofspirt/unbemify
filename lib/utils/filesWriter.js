const fs = require('fs')

function filesWriter (options) {
  function writeFile (file) {
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(file.path)

      stream.write(file.content)
      stream.on('finish', resolve)
        .on('error', e => {
          if (e.code === 'ENOENT') {
            return reject(`No such file: ${file.path}`) // eslint-disable-line
          }

          return reject(e)
        })
        .end()
    })
  }

  const writePromises = options.files.map(writeFile)

  writePromises.push(writeFile(options.style))

  return Promise.all(writePromises)
}

module.exports = filesWriter