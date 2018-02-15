const optionsConstructor = require('../lib/utils/optionsConstructor')

describe('Options constructor', () => {
  it('should correctly construct options object', () => {
    const options = optionsConstructor({
      style: 'style.css',
      files: ['bundle.js', 'index.html'],
      verbose: true
    })

    expect(options.style.path)
      .toBe('style.css')

    expect(options.files)
      .toBeInstanceOf(Array)

    expect(options.files[1].path)
      .toBe('index.html')
  })
})