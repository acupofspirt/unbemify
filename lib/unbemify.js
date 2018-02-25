const logger = require('./utils/logger'),
      configParser = require('./parsers/configParser'),
      styleParser = require('./parsers/styleParser'),
      filesReader = require('./utils/filesReader'),
      filesWriter = require('./utils/filesWriter'),
      optionsConstructor = require('./utils/optionsConstructor'),
      minificationReport = require('./utils/minificationReport'),
      freqAnalyzer = require('./replacer/freqAnalyzer'),
      replacer = require('./replacer')

function unbemify (configObject) {
  const startTime = process.hrtime(),
        config = configParser(configObject),
        options = optionsConstructor(config)

  logger.log('Unbemify started ...')

  return filesReader(options)
    .then(() => {
      const selectors = styleParser(options.style.content),
            resources = options.files.map(file => file.content),
            selectorsData = freqAnalyzer(selectors, resources, config)

      replacer(selectorsData, options)

      return filesWriter(options)
        .then(() => minificationReport(selectorsData, options, startTime))
    })
    .catch(logger.error)
}

module.exports = unbemify