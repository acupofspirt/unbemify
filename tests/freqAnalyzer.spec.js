const freqAnalyzer = require('../lib/replacer/freqAnalyzer')

describe('Frequency analyzer', () => {
  const selectors = [
          'lol',
          'kek',
          'clazz',
          'topchek'
        ],
        resources = [
          "document.querySelector('.lol');div.classList.toggle('lol');somePseudoJS('.clazz')",
          "<div class='lol kek'><p class='kek'>some text</p></div>"
        ],
        freqData = freqAnalyzer(selectors, resources)

  it('should correctly analyze frequency of selectors', () => {
    expect(freqData).toEqual([
      {
        name: 'lol', count: 3, identifier: '00'
      },
      {
        name: 'kek', count: 2, identifier: '00'
      },
      {
        name: 'clazz', count: 1, identifier: '00'
      },
      {
        name: 'topchek', count: 0, identifier: '00'
      }
    ]
    )
  })

  it('should correctly map data to returned dictionary', () => {
    expect(freqData.length).toBe(4)
  })

  it('should correctly analyze nonexistent selectors', () => {
    expect(freqData[3]).toEqual({
      name: 'topchek', count: 0, identifier: '00'
    })
  })

  it('should correctly analyze one selector in different files', () => {
    expect(freqData[0]).toEqual({
      name: 'lol', count: 3, identifier: '00'
    })
  })

  it('should correctly sort selectors by frequency', () => {
    const counts = freqData.map(selector => selector.count)

    expect(counts).toEqual([
      3,
      2,
      1,
      0
    ])
  })
})