const fs = require('fs-extra')

const copyAssets = (srcPath, destinationPath) => {
  fs.copySync(`${srcPath}/assets`, `${destinationPath}/assets`)
}

module.exports = copyAssets
