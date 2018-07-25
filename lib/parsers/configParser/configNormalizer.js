const pathNormalizer = require('./pathNormalizer'),
      logger = require('../../utils/logger')

/**
 * Normalizes configuration object
 * @param {object} config Configuration object
 * @return {object} Normalized config object
 */
function configNormalizer (config) {
  const baseConfig = {
          style: '',
          files: '',
          unused: false,
          verbose: false,
          exclude: []
        },
        dotRegExp = /\./g

  const {style, files, unused, verbose, exclude} = config

  if (
    typeof style === 'string' &&
    style.length !== 0
  ) {
    baseConfig.style = pathNormalizer(style)
  }
  else {
    logger.error('Style file path must be nonempty string')
  }


  if (
    Array.isArray(files) &&
    files.length !== 0
  ) {
    baseConfig.files = files.map(pathNormalizer)
  }
  else if (
    typeof files === 'string' &&
    files.length !== 0
  ) {
    baseConfig.files = [pathNormalizer(files)]
  }
  else {
    logger.error('File paths must be nonempty string or array of strings')
  }


  if (unused !== undefined) {
    baseConfig.unused = unused
  }


  if (verbose !== undefined) {
    baseConfig.verbose = verbose
  }


  if (Array.isArray(exclude)) {
    baseConfig.exclude = exclude.map(e => e.replace(dotRegExp, ''))
  }

  return baseConfig
}

module.exports = configNormalizer