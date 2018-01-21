const getIdentifier = require('./getIdentifier')

function generateRegExp (selector) {
  return new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
}

function replacer (selectors, options) {
  const style = options.style,
        files = options.files,
        resourcesCount = files.length,
        bits = [0],
        symbols = ['c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'r', 't', 'v', 'w', 'x', 'y', 'z', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'R', 'T', 'V', 'W', 'X', 'Y', 'Z'],
        symbolsLastIndex = symbols.length - 1,
        selectorsCount = selectors.length

  for (let i = 0; i < selectorsCount; i++) {
    const selector = selectors[i]

    selector.newName = getIdentifier(bits, symbols, symbolsLastIndex)
  }

  selectors = selectors.sort((a, b) => b.name.length - a.name.length)  // eslint-disable-line

  for (let j = 0; j < selectorsCount; j++) {
    const selector = selectors[j],
          newName = selector.newName,
          oldName = generateRegExp(selector.name)

    for (let n = 0; n < resourcesCount; n++) {
      const file = files[n]

      file.content = file.content.replace(oldName, newName)
      file.minifiedSize = file.content.length
    }

    style.content = style.content.replace(oldName, newName)
    style.minifiedSize = style.content.length
  }
}

module.exports = replacer