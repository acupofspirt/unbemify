const chalk = require('chalk')

module.exports = {
  error (msg) {
    if (process.env.NODE_ENV !== 'TEST') {
      return console.error(`${chalk.white.bgRed(' Error: ')} ${chalk.bold.red(msg)}`)
    }
  },
  info (msg) {
    if (process.env.NODE_ENV !== 'TEST') {
      return console.log(chalk.bold.blue(msg))
    }
  },
  log (msg) {
    if (process.env.NODE_ENV !== 'TEST') {
      return console.log(chalk.bold.green(msg))
    }
  },
  debug (msg) {
    if (process.env.NODE_ENV === 'DEBUG') {
      return console.log(`${chalk.white.bgBlue(' DEBUG: ')} ${chalk.blue(msg)}`)
    }
  }
}