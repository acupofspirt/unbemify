const path = require('path'),
      rootPath = process.cwd(),
      logger = require('../../utils/logger')

/**
 * Normalizes relative path
 * @param {string} rawPath Path string
 * @return {object} Normalized file path data
 */
function pathNormalizer (rawPath) {
  const {name, ext, base} = path.parse(rawPath),
        isPathValid = name && ext

  if (isPathValid) {
    const normalizedPath = path.normalize(rawPath)
    let resolvedPath = normalizedPath

    if (!path.isAbsolute(normalizedPath)) {
      resolvedPath = path.resolve(rootPath, normalizedPath)
    }

    return {
      fullPath: resolvedPath,
      fileName: base
    }
  }

  logger.error(`Invalid path: ${rawPath}`)
}

module.exports = pathNormalizer