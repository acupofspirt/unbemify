const chalk = require('chalk')

module.exports = {
  error (msg) {
    if (process.env.NODE_ENV !== 'TEST') {
      console.error(`${chalk.white.bgRed(' Error: ')} ${chalk.bold.red(msg)}`)
      process.exit()
    }
    else {
      // Throw exception so test runner could catch it
      throw Error(msg)
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
  }
}