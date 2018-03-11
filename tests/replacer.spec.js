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
            ]
          },
          selectors = styleParser(data.style.content),
          selectorsData = freqAnalyzer(
            selectors,
            data,
            {unused: false}
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
            ]
          },
          selectors = styleParser(data.style.content),
          selectorsData = freqAnalyzer(
            selectors,
            data,
            {unused: false}
          )

    replacer(selectorsData, data)

    expect(data.style.content).toEqual('.c {} div {}')
    expect(data.files[0].content).toEqual('fn(".c");')
  })
})