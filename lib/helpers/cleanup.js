const fs = require('fs-extra');

const cleanup = folderPath => {
  // cleanup destination folder
  if (fs.existsSync(folderPath)) {
    fs.rmdirSync(folderPath, { recursive: true });
  }
  fs.mkdirSync(folderPath)
  fs.mkdirSync(`${folderPath}/posts`)
}

module.exports = cleanup
