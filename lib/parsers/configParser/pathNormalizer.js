const path = require('path'),
      rootPath = process.cwd(),
      logger = require('../../utils/logger')

/**
 * Checks path string for valid form
 * @param {String} pth Path string
 * @return {Boolean} Validity flag
 */
function isPathValid (pth) {
  let parsedPath = path.parse(pth)

  if (
    parsedPath.name !== '' &&
    parsedPath.ext !== ''
  ) {
    return true
  }

  return false
}

/**
 * Normalizes relative path
 * @param {String} rawPath Path string
 * @return {String} Normalized path
 */
function pathNormalizer (rawPath) {
  if (isPathValid(rawPath)) {
    const normalizedPath = path.normalize(rawPath)

    if (path.isAbsolute(normalizedPath)) {
      return normalizedPath
    }

    return path.resolve(rootPath, normalizedPath)
  }

  logger.error(`Invalid path: ${rawPath}`)
}

module.exports = pathNormalizer