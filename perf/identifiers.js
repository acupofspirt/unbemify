const getIdentifier = require('../lib/replacer/getIdentifier'),
      v8 = require('v8-natives')

const bits = [0],
      symbols = [
        'a',
        'b',
        'c'
      ],
      symbolsLastIndex = symbols.length - 1

for (let i = 0; i <= 7; i++) {
  getIdentifier(bits, symbols, symbolsLastIndex)
}

getIdentifier(bits, symbols, symbolsLastIndex)
v8.optimizeFunctionOnNextCall(getIdentifier)
getIdentifier(bits, symbols, symbolsLastIndex)
v8.helpers.printStatus(getIdentifier)