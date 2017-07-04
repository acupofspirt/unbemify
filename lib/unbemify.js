const logger = require('./utils/logger'),
      argsParser = require('./parsers/argsParser'),
      styleParser = require('./parsers/styleParser'),
      filesReader = require('./utils/filesReader'),
      filesWriter = require('./utils/filesWriter'),
      minificationReport = require('./utils/minificationReport'),
      freqAnalyzer = require('./replacer/freqAnalyzer'),
      replacer = require('./replacer')

function unbemify () {
  logger.log('Unbemify started ...')

  const startTime = process.hrtime(),
        options = argsParser(process.argv)

  if (options.mistake) {
    logger.error(options.mistake)
  }
  else {
    filesReader(options)
      .then(() => {
        const selectors = styleParser(options.style.content),
              resources = options.files.map(file => file.content),
              selectorsData = freqAnalyzer(selectors, resources)

        replacer(selectorsData, options)

        filesWriter(options)
          .then(() => minificationReport(selectorsData, options, startTime))
          .catch(e => logger.error(e))
      })
      .catch(e => logger.error(e))
  }
}

module.exports = unbemify