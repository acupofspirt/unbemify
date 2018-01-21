const csstree = require('css-tree'),
      logger = require('../utils/logger')

function styleParser (styleFile) {
  const ast = csstree.parse(styleFile, {
          parseValue: false,
          onParseError ({formattedMessage}) {
            logger.error(formattedMessage)
          }
        }),
        selectorsArr = []
  let selectorsSet = new Set()

  csstree.walk(ast, {
    visit: 'ClassSelector',
    enter (node) {
      selectorsSet.add(node.name)
    }
  })

  for (const item of selectorsSet) {
    selectorsArr.push(item)
  }

  selectorsSet = null

  return selectorsArr
}

module.exports = styleParser