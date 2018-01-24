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
        name: 'lol', count: 3, newName: ''
      },
      {
        name: 'kek', count: 2, newName: ''
      },
      {
        name: 'clazz', count: 1, newName: ''
      },
      {
        name: 'topchek', count: 0, newName: ''
      }
    ])
  })

  it('should correctly map data to returned dictionary', () => {
    expect(freqData.length).toBe(4)
  })

  it('should correctly analyze nonexistent selectors', () => {
    expect(freqData[3]).toEqual({
      name: 'topchek', count: 0, newName: ''
    })
  })

  it('should correctly analyze one selector in different files', () => {
    expect(freqData[0]).toEqual({
      name: 'lol', count: 3, newName: ''
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