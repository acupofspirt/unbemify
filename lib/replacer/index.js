const getIdentifier = require('./getIdentifier')

function generateRegExp (selector) {
  return new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
}

function replacer (selectors, options) {
  const style = options.style,
        files = options.files,
        resourcesCount = files.length,
        bits = [0],
        symbols = [ 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'r', 't', 'v', 'w', 'x', 'y', 'z', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'R', 'T', 'V', 'W', 'X', 'Y', 'Z' ], // eslint-disable-line
        symbolsLastIndex = symbols.length - 1,
        selectorsCount = selectors.length

  for (let i = 0; i < selectorsCount; i++) {
    const selector = selectors[i]

    selector.identifier = getIdentifier(bits, symbols, symbolsLastIndex)
  }

  selectors = selectors.sort((a, b) => b.name.length - a.name.length);  // eslint-disable-line

  for (let j = 0; j < selectorsCount; j++) {
    const selector = selectors[j],
          newName = selector.identifier,
          oldName = generateRegExp(selector.name)

    for (let n = 0; n < resourcesCount; n++) {
      files[n].content = files[n].content.replace(oldName, newName)
    }

    style.content = style.content.replace(oldName, newName)
  }

  for (let k = 0; k < resourcesCount; k++) {
    const file = files[k]

    file.minifiedSize = file.content.length
  }

  style.minifiedSize = style.content.length
}

module.exports = replacer