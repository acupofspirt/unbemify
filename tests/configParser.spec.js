const configNormalizer = require('../lib/parsers/configParser/configNormalizer'),
      pathNormalizer = require('../lib/parsers/configParser/pathNormalizer'),
      configParser = require('../lib/parsers/configParser'),
      path = require('path')

describe('File path normalizer', () => {
  it('should transform relative path to absolute', () => {
    const normalizedPath = pathNormalizer('folder/style.css')

    expect(path.isAbsolute(normalizedPath.fullPath))
      .toBe(true)
  })

  it('should not accept path without extension', () => {
    expect(() => {pathNormalizer('folde')})
      .toThrow('Invalid path: folde')

    expect(() => {pathNormalizer('/asd/folde')})
      .toThrow('Invalid path: /asd/folde')
  })

  it('should accept path with extension', () => {
    expect(() => {pathNormalizer('folde.css')})
      .not.toThrow('Invalid path: folde.css')

    expect(() => {pathNormalizer('/asd/folde.css')})
      .not.toThrow('Invalid path: /asd/folde.css')
  })
})

describe('Configuration normalizer', () => {
  it('should not accept config without style path', () => {
    expect(() => {configNormalizer({})})
      .toThrow('Style file path must be nonempty string')
  })

  it('should not accept config without file path', () => {
    expect(() => {configNormalizer({style: 'style.css'})})
      .toThrow('File paths must be nonempty string or array of strings')
  })

  it('should accept files as string and convert it to array', () => {
    const config = configNormalizer({
      style: 'style.css',
      files: 'bundle.js'
    })

    expect(config.files)
      .toBeInstanceOf(Array)
  })

  it('should accept files as array', () => {
    const config = configNormalizer({
      style: 'style.css',
      files: ['bundle.js']
    })

    expect(config.files)
      .toBeInstanceOf(Array)
  })

  it('should accept partial config object', () => {
    const config = configNormalizer({
      style: 'style.css',
      files: ['bundle.js'],
      verbose: true
    })

    expect(config.verbose)
      .toBe(true)

    expect(config.unused)
      .toBe(false)

    expect(config.exclude)
      .toEqual([])
  })
})

describe('Configuration parser', () => {
  it('should accept configuration object as an argument', () => {
    expect(() => {
      configParser({
        style: 'dist/style.css',
        files: ['dist'],
        unused: true
      })
    })
      .not.toThrow(/Missing configuration/)
  })

  it('should accept configuration object as a js file', () => {
    process.argv[2] = './tests/fixtures/unb.config.js'

    expect(() => {configParser()})
      .not.toThrow(/Missing configuration/)
  })

  it('should throw error if no any configuration provided', () => {
    process.argv = []

    expect(() => {configParser()})
      .toThrow(/Missing configuration/)
  })
})