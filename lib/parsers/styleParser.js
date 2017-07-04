const csstree = require('css-tree')

function styleParser (styleFile) {
  const ast = csstree.parse(styleFile, {parseValue: false}),
        selectorsSet = new Set(),
        selectorsArr = []

  csstree.walk(ast, node => {
    if (node.type === 'ClassSelector') {
      selectorsSet.add(node.name)
    }
  })

  for (const item of selectorsSet) {
    selectorsArr.push(item)
  }

  return selectorsArr
}


module.exports = styleParser