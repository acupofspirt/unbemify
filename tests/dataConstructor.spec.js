const dataConstructor = require('../lib/utils/dataConstructor')

describe('Data constructor', () => {
  it('should correctly construct data object', () => {
    const data = dataConstructor({
      style: 'style.css',
      files: ['bundle.js', 'index.html'],
      verbose: true
    })

    expect(data.style.path)
      .toBe('style.css')

    expect(data.files)
      .toBeInstanceOf(Array)

    expect(data.files[1].path)
      .toBe('index.html')
  })
})