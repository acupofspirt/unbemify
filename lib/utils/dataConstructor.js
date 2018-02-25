function dataConstructor (config) {
  const baseData = {
          style: {
            path: '',
            content: '',
            size: 0,
            minifiedSize: 0
          },
          files: []
        },
        baseFiles = baseData.files,
        configFiles = config.files,
        configFilesLength = configFiles.length

  for (let i = 0; i < configFilesLength; i++) {
    baseFiles.push({
      path: configFiles[i],
      content: '',
      size: 0,
      minifiedSize: 0
    })
  }

  baseData.style.path = config.style

  return baseData
}

module.exports = dataConstructor