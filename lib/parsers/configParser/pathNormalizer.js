const path = require('path'),
      rootPath = process.cwd(),
      logger = require('../../utils/logger')

function isPathValid (pth) {
  let parsedPath = {}

  parsedPath = path.parse(pth)

  if (
    parsedPath.name !== '' &&
    parsedPath.ext !== ''
  ) {
    return true
  }

  return false
}

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