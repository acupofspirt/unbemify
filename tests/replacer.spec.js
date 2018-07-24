const replacer = require('../lib/replacer'),
      freqAnalyzer = require('../lib/replacer/freqAnalyzer'),
      styleParser = require('../lib/parsers/styleParser')

describe('CSS class replacer', () => {
  it('should correctly replace all classes', () => {
    const data = {
            style: {
              path: 'somepath.css',
              size: '',
              content: '.class-1 {} .class-2 {} .clazz-12:not(.clazz-13) {} #lol {}'
            },
            files: [
              {
                path: 'somepath.js',
                size: '',
                content: 'get(".class-1"); get("class-2"); g(class-2); <div class="clazz-12 clazz-13"></div>'
              }
            ],
            report: {
              unusedSelectorsCount: 0
            }
          },
          selectors = styleParser(data.style.content),
          selectorsData = freqAnalyzer(
            selectors,
            data,
            {unused: false, exclude: []}
          )

    replacer(selectorsData, data)

    expect(data.style.content).toEqual('.f {} .c {} .d:not(.e) {} #lol {}')
    expect(data.files[0].content).toEqual('get(".f"); get("c"); g(c); <div class="d e"></div>')
  })

  it('should not replace tag selectors in style file', () => {
    const data = {
            style: {
              path: 'somepath.css',
              size: '',
              content: '.div {} div {}'
            },
            files: [
              {
                path: 'somepath.js',
                size: '',
                content: 'fn(".div");'
              }
            ],
            report: {
              unusedSelectorsCount: 0
            }
          },
          selectors = styleParser(data.style.content),
          selectorsData = freqAnalyzer(
            selectors,
            data,
            {unused: false, exclude: []}
          )

    replacer(selectorsData, data)

    expect(data.style.content).toEqual('.c {} div {}')
    expect(data.files[0].content).toEqual('fn(".c");')
  })

  it('should replace only whole entries of word', () => {
    const data = {
            style: {
              path: 'somepath.css',
              size: '',
              content: '.row {}'
            },
            files: [
              {
                path: 'somepath.js',
                size: '',
                content: 'fn(".row", "row-col3", "re-row"); throw; console.log("Throwed")'
              }
            ],
            report: {
              unusedSelectorsCount: 0
            }
          },
          selectors = styleParser(data.style.content),
          selectorsData = freqAnalyzer(
            selectors,
            data,
            {unused: false, exclude: []}
          )

    replacer(selectorsData, data)

    expect(data.style.content).toEqual('.c {}')
    expect(data.files[0].content).toEqual('fn(".c", "row-col3", "re-row"); throw; console.log("Throwed")')
  })
})