const path = require('path')

module.exports = {
  style: path.resolve(__dirname, 'dist/style.css'),
  files: ['dist'],
  unused: false,
  verbose: false,
  exclude: []
}