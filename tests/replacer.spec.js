const replacer = require('../lib/replacer'),
      freqAnalyzer = require('../lib/replacer/freqAnalyzer'),
      styleParser = require('../lib/parsers/styleParser')

describe('CSS class replacer', () => {
  it('should correctly replace all classes', () => {
    const options = {
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
          selectors = styleParser(options.style.content),
          selectorsData = freqAnalyzer(
            selectors,
            options.files.map(file => file.content),
            {unused: false}
          )

    replacer(selectorsData, options)

    expect(options.style.content).toEqual('.f {} .c {} .d:not(.e) {} #lol {}')
    expect(options.files[0].content).toEqual('get(".f"); get("c"); g(c); <div class="d e"></div>')
  })
})