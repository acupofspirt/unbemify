/**
 * Constructs from config data object with files/style content
 * @param {Object} config Configuration object
 * @return {Object} Object with files/style content
 */
function dataConstructor (config) {
  const baseData = {
          style: {
            path: '',
            fileName: '',
            content: '',
            size: 0,
            minifiedSize: 0
          },
          files: [],
          report: {
            unusedSelectorsCount: 0
          }
        },
        baseFiles = baseData.files,
        configFiles = config.files,
        configFilesLength = configFiles.length

  for (let i = 0; i < configFilesLength; i++) {
    const filePath = configFiles[i]
    baseFiles.push({
      path: filePath.fullPath,
      fileName: filePath.fileName,
      content: '',
      size: 0,
      minifiedSize: 0
    })
  }

  baseData.style.path = config.style.fullPath
  baseData.style.fileName = config.style.fileName

  return baseData
}

module.exports = dataConstructor