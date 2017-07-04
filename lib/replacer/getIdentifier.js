function getIdentifier (bits, symbols, symbolsLastIndex) {
  const bitsCount = bits.length,
        lowerBitIndex = bitsCount - 1
  let newIdentifier = ''

  for (let j = 0; j < bitsCount; j++) {
    newIdentifier += symbols[bits[j]]
  }

  for (let i = lowerBitIndex; i >= 0; i--) {
    if (bits[i] < symbolsLastIndex) {
      bits[i]++

      if (i !== 0 && bits[i - 1] <= symbolsLastIndex) {
        break
      }
    }
    else {
      bits[i] = 0

      if (i === 0) {
        bits.unshift(0)
      }
    }
  }

  return newIdentifier
}

module.exports = getIdentifier