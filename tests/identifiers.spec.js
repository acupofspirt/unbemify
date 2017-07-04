const getIdentifier = require('../lib/replacer/getIdentifier')

describe('Identifier generator', () => {
  it('should correctly return identifier', () => {
    const bits = [0],
          symbols = [
            'a',
            'b',
            'c'
          ],
          symbolsLastIndex = symbols.length - 1
    let newName = ''

    for (let i = 0; i <= 7; i++) {
      newName = getIdentifier(bits, symbols, symbolsLastIndex)
    }

    expect(newName).toEqual('bb')

    newName = getIdentifier(bits, symbols, symbolsLastIndex)
    expect(newName).toEqual('bc')
  })

  it('should start with shortest identifier', () => {
    const bits = [0],
          symbols = [
            'a',
            'b',
            'c'
          ],
          symbolsLastIndex = symbols.length - 1
    let newName = ''

    newName = getIdentifier(bits, symbols, symbolsLastIndex)

    expect(newName).toEqual('a')
  })

  it('should correctly build bits', () => {
    const bits = [0],
          symbols = [
            'a',
            'b',
            'c'
          ],
          symbolsLastIndex = symbols.length - 1

    for (let i = 0; i <= 11; i++) {
      getIdentifier(bits, symbols, symbolsLastIndex)
    }

    expect(bits).toEqual([
      0,
      0,
      0
    ])
  })
})