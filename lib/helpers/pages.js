const fs = require('fs-extra')
const path = require('path')
const pug = require('pug')

const createPages = (srcPath, destinationPath, postsData) => {
  const pagesPath = `${srcPath}/pages`
  const pages = fs.readdirSync(pagesPath)
  const options = {
    postsData
  }

  pages.forEach(page => {
    const filePath = path.join(pagesPath, page)
    const render = pug.renderFile(filePath, options)
    const filename = path.parse(filePath).name
    const outputFilename = `${destinationPath}/${filename}.html`
    
    fs.writeFileSync(outputFilename, render)
  })
}

module.exports = createPages
