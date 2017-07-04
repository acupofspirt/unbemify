const path = require('path'),
      fs = require('fs')

function filesWriter (options) {
  const rootPath = process.cwd()

  function updateFile (file) {
    return new Promise((resolve, reject) => {
      const absoluteFilePath = path.resolve(rootPath, file.path)

      fs.truncate(absoluteFilePath, err => {
        if (err) {
          return reject(err)
        }

        const wstream = fs.createWriteStream(absoluteFilePath)

        wstream.write(file.content)
        wstream.end()
        wstream.on('finish', resolve)
        wstream.on('error', e => {
          if (e.code === 'ENOENT') {
            return reject(`No such file: ${file.path}`) // eslint-disable-line
          }

          return reject(e)
        })
      })
    })
  }

  const writePromises = options.files.map(updateFile)

  writePromises.push(updateFile(options.style))

  return Promise.all(writePromises)
}

module.exports = filesWriter