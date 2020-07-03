const fs = require('fs');

const cleanup = folderPath => {
  // cleanup destination folder
  if (fs.existsSync(folderPath)) {
    fs.rmdirSync(folderPath, { recursive: true });
  }
  fs.mkdirSync(folderPath)
}

module.exports = cleanup
