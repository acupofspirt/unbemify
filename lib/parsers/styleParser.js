const csstree = require('css-tree');

function styleParser (styleFile) {
  const ast = csstree.parse(styleFile, {parseValue: false}),
        selectors = new Set();

  csstree.walk(ast, node => {
    if (node.type === 'ClassSelector') {
      selectors.add(node.name);
    }
  });

  return Array.from(selectors);
}


module.exports = styleParser;