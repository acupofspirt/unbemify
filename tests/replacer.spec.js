const replacer = require('../lib/replacer'),
      styleParser = require('../lib/parsers/styleParser');

describe('CSS class replacer', () => {
  it('should correctly replace all classes', () => {
    const options = {
            style: {
              path: 'somepath.css',
              size: '',
              content: '.class-1 {} .class-2 {} .clazz-12:not(.clazz-13) {} #lol {}'
            },
            files: [{
              path: 'somepath.js',
              size: '',
              content: 'get(".class-1"); get("class-2"); g(class-2); <div class="clazz-12 clazz-13"></div>'
            }]
          },
          selectors = styleParser(options.style.content);

    replacer(selectors, options);

    expect(options.style.content).toEqual('.d {} .a {} .b:not(.c) {} #lol {}');
    expect(options.files[0].content).toEqual('get(".d"); get("a"); g(a); <div class="b c"></div>');
  });
});