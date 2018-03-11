const getIdentifier = require('./getIdentifier'),
      escapeRegExp = /[.*+?^${}()|[\]\\]/g

/**
 * Generates regular expression from string
 * @param {String} selector Selector
 * @return {RegExp} Regexp object
 */
function generateRegExp (selector) {
  return new RegExp(selector.replace(escapeRegExp, '\\$&'), 'g')
}

/**
 * Replaces selectors to more shorter in all files
 * @param {Array} selectorsData Frequency data for each selector
 * @param {Object} data Object with files/style content
 * @return {undefined} Returns nothing
 */
function replacer (selectorsData, data) {
  const style = data.style,
        files = data.files,
        resourcesCount = files.length,
        bits = [0],
        symbols = ['c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'r', 't', 'v', 'w', 'x', 'y', 'z', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'R', 'T', 'V', 'W', 'X', 'Y', 'Z'],
        symbolsLastIndex = symbols.length - 1,
        selectorsCount = selectorsData.length

  for (let i = 0; i < selectorsCount; i++) {
    const selector = selectorsData[i]

    selector.newName = getIdentifier(bits, symbols, symbolsLastIndex)
  }

  selectorsData = selectorsData.sort((a, b) => b.name.length - a.name.length)  // eslint-disable-line

  for (let j = 0; j < selectorsCount; j++) {
    const selector = selectorsData[j],
          newName = selector.newName,
          oldName = generateRegExp(selector.name),
          oldFullName = generateRegExp(`.${selector.name}`)

    for (let n = 0; n < resourcesCount; n++) {
      const file = files[n]

      file.content = file.content.replace(oldName, newName)
      file.minifiedSize = file.content.length
    }

    style.content = style.content.replace(oldFullName, `.${newName}`)
    style.minifiedSize = style.content.length
  }
}

module.exports = replacer