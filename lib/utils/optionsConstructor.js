function optionsConstructor (config) {
  const baseOptions = {
          style: {
            path: '',
            content: '',
            size: 0,
            minifiedSize: 0
          },
          files: []
        },
        baseFiles = baseOptions.files,
        configFiles = config.files,
        filesLength = configFiles.length

  for (let i = 0; i < filesLength; i++) {
    baseFiles.push({
      path: configFiles[i],
      content: '',
      size: 0,
      minifiedSize: 0
    })
  }

  baseOptions.style.path = config.style

  return baseOptions
}

module.exports = optionsConstructor