const fs = require('fs-extra')

const logger = require('./logger')

const copyAssets = (srcPath, destinationPath) => {
  logger('INFO', 'Copying static assets')
  fs.copySync(`${srcPath}/assets`, `${destinationPath}/assets`)
}

module.exports = copyAssets
