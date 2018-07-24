const pathNormalizer = require('./pathNormalizer'),
      configNormalizer = require('./configNormalizer'),
      logger = require('../../utils/logger')

/**
 * Parses config object if any provided
 * @param {Object} [configObject] Configuration object
 * @return {Object} Resulted config object
 */
function configParser (configObject) {
  // Programmatic invoke case
  if (typeof configObject !== 'undefined') {
    return configNormalizer(configObject)
  }

  const configPath = process.argv[2]

  // Command line invoke case
  if (configPath && configPath.length) {
    const normalizedConfigPath = pathNormalizer(configPath),
          loadedConfig = require(normalizedConfigPath.fullPath)

    return configNormalizer(loadedConfig)
  }

  logger.error(`Missing configuration
If you running unbemify through command line you must specify path to config file: unbemify unb.config.js
If you use unbemify in some code you must pass an config object as first argument: unbemify(configObject)`)
}

module.exports = configParser