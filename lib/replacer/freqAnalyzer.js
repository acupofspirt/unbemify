const generateRegExp = require('../utils/generateRegExp')

/**
 * Analyzes the frequency of occurrence of classes in files
 * @param {array} selectors Array of selectors
 * @param {object} data Files/style content
 * @param {object} config Configuration object
 * @return {array} Frequency data for each selector
 */
function freqAnalyzer (selectors, data, config) {
  let selectorsData = selectors.map(value => ({
    name: value, count: 0, newName: ''
  }))
  const files = data.files,
        selectorsCount = selectorsData.length,
        filesCount = files.length,
        {unused, exclude} = config,
        excludeLength = exclude.length

  for (let i = 0; i < selectorsCount; i++) {
    const selector = selectorsData[i],
          replaceReg = selector.replaceReg = generateRegExp(selector.name, false)

    selector.replaceRegWithDot = generateRegExp(selector.name, true)

    for (let j = 0; j < filesCount; j++) {
      const file = files[j].content,
            match = file.match(replaceReg)

      if (match !== null) {
        selector.count += match.length
      }
    }
  }

  const usedOnlySelectorsData = selectorsData
    .filter(selector => selector.count)

  data.report.unusedSelectorsCount =
    selectorsData.length - usedOnlySelectorsData.length

  if (!unused) {
    selectorsData = usedOnlySelectorsData
  }

  if (excludeLength) {
    let selectorsDataLength = selectorsData.length

    for (let i = 0; i < excludeLength; i++) {
      const currentExclude = exclude[i]

      for (let j = 0; j < selectorsDataLength; j++) {
        if (selectorsData[j].name === currentExclude) {
          selectorsData.splice(j, 1)
          selectorsDataLength = selectorsData.length

          break
        }
      }
    }
  }

  return selectorsData
    .sort((a, b) => b.count * b.name.length - a.count * a.name.length)
}

module.exports = freqAnalyzer