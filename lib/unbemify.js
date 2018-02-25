const logger = require('./utils/logger'),
      configParser = require('./parsers/configParser'),
      styleParser = require('./parsers/styleParser'),
      filesReader = require('./utils/filesReader'),
      filesWriter = require('./utils/filesWriter'),
      dataConstructor = require('./utils/dataConstructor'),
      minificationReport = require('./utils/minificationReport'),
      freqAnalyzer = require('./replacer/freqAnalyzer'),
      replacer = require('./replacer')

function unbemify (configObject) {
  const startTime = process.hrtime(),
        config = configParser(configObject),
        data = dataConstructor(config)

  logger.log('Unbemify started ...')

  return filesReader(data)
    .then(() => {
      const selectors = styleParser(data.style.content),
            selectorsData = freqAnalyzer(selectors, data, config)

      replacer(selectorsData, data)

      return filesWriter(data)
        .then(() => minificationReport(selectorsData, data, startTime))
    })
    .catch(logger.error)
}

module.exports = unbemify