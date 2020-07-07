const fs = require('fs-extra')
const readline = require('readline')

async function getTitle(filePath) {  
  const fileStream = fs.createReadStream(filePath)
  const reader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  const line = await new Promise((resolve) => {
    reader.on('line', (line) => {
      reader.close()
      resolve(line)
    })
  })
  fileStream.close()

  return line.replace('# ','')
}

module.exports = getTitle
