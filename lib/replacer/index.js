const freqAnalyzer = require('./freqAnalyzer'),
      getIdentifier = require('./getIdentifier');

const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function replacer (selectors, options) {
  const style = options.style,
        files = options.files,
        selectorsData = freqAnalyzer(
          selectors,
          options.files.map(file => file.content)
        ),
        selectorsCount = selectorsData.length,
        resourcesCount = files.length,
        bits = [0],
        symbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        symbolsLastIndex = symbols.length - 1,
        sourceMap = {};

  for (let i = 0; i < selectorsCount; i++) {
    const selector = selectorsData[i].name,
          newName = getIdentifier(bits, symbols, symbolsLastIndex),
          replaceTarget = new RegExp(escapeRegExp(selector), 'g');

    sourceMap[selector] = newName;

    for (let j = 0; j < resourcesCount; j++) {
      files[j].content = files[j].content.replace(replaceTarget, newName);
    }
    style.content = style.content.replace(replaceTarget, newName);
  }

  for (let k = 0; k < resourcesCount; k++) {
    const file = files[k];

    file.minifiedSize = file.content.length;
  }

  style.minifiedSize = style.content.length;
}

module.exports = replacer;