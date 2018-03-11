/**
 * Analyzes the frequency of occurrence of classes in files
 * @param {String[]} selectors Array of selectors
 * @param {Object} data Files/style content
 * @param {Object} config Configuration object
 * @return {Array[{name, count, newName}]} Frequency data for each selector
 */
function freqAnalyzer (selectors, data, config) {
  let selectorsData = selectors.map(value => ({
        name: value, count: 0, newName: ''
      }))
  const files = data.files,
        selectorsCount = selectorsData.length,
        filesCount = files.length

  for (let i = 0; i < selectorsCount; i++) {
    const selector = selectorsData[i]

    for (let j = 0; j < filesCount; j++) {
      const file = files[j].content,
            match = file.match(new RegExp(selector.name, 'g'))

      if (match !== null) {
        selector.count += match.length
      }
    }
  }

  if (!config.unused) {
    selectorsData = selectorsData
      .filter(selector => selector.count)
  }

  return selectorsData
    .sort((a, b) => b.count * b.name.length - a.count * a.name.length)
}

module.exports = freqAnalyzer