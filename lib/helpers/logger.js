const chalk = require('chalk')

const logger = (type, log) => {
  const emoji = '🐻'
  let color
  switch (type) {
  case 'INFO':
    color = chalk.blue
    break
  case 'WARN':
    color = chalk.yellow
    break
  case 'ERROR':
    color = chalk.red
    break
  case 'SUCCESS':
    color = chalk.green
    break
  default:
    color = chalk.blue
    break
  }
  const msg = color(`${type}: ${log}`)
  console.log(`${emoji} ${msg}`)
}

module.exports = logger
