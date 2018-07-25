/**
 * Generates unique string
 * @param {array} bits Array of bits thats represents some number
 * @param {array} symbols Symbols list
 * @param {number} symbolsLastIndex Last index value in symbols list
 * @return {string} Next unique indentifier
 */
function getIdentifier (bits, symbols, symbolsLastIndex) {
  const lowerBitIndex = bits.length - 1
  let newIdentifier = ''

  for (let j = 0; j <= lowerBitIndex; j++) {
    newIdentifier += symbols[bits[j]]
  }

  for (let i = lowerBitIndex; i >= 0; i--) {
    // If it is not the biggest digit
    // then simply increment it
    if (bits[i] !== symbolsLastIndex) {
      bits[i]++

      break
    }
    // Otherwise there is a bit overflow
    else {
      bits[i] = 0

      // If it was a highest bit
      // then we add a new one
      if (i === 0) {
        bits.unshift(0)
      }
    }
  }

  return newIdentifier
}

module.exports = getIdentifier