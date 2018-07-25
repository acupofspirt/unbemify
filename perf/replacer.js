const replacer = require('../lib/replacer'),
      freqAnalyzer = require('../lib/replacer/freqAnalyzer'),
      styleParser = require('../lib/parsers/styleParser'),
      v8 = require('v8-natives')

function getData () {
  return {
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
  }
}

const data = getData(),
      data1 = getData(),
      selectors = styleParser(data.style.content),
      selectorsData = freqAnalyzer(
        selectors,
        data,
        {unused: false, exclude: []}
      )

replacer(selectorsData, data)
v8.optimizeFunctionOnNextCall(replacer)
replacer(selectorsData, data1)
v8.helpers.printStatus(replacer)