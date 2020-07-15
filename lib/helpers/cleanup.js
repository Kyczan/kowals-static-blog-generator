const fs = require('fs-extra')

const logger = require('./logger')

const cleanup = folderPath => {
  logger('INFO', 'Cleaning destination folder')

  if (fs.existsSync(folderPath)) {
    fs.rmdirSync(folderPath, { recursive: true })
  }
  fs.mkdirSync(folderPath)
  fs.mkdirSync(`${folderPath}/posts`)
}

module.exports = cleanup
