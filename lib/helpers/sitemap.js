const fs = require('fs-extra')
const path = require('path')
const pug = require('pug')

const logger = require('./logger')

const crawlDistFolder = (destinationPath, websiteUrl, originalDestinationPath) => {
  let links = []
  const dir = fs.readdirSync(destinationPath)

  dir.forEach(page => {
    const filePath = path.join(destinationPath, page)
    const stats = fs.statSync(filePath)

    if(stats.isDirectory()) {
      links = links.concat(crawlDistFolder(filePath, websiteUrl, originalDestinationPath))
    } else {
      const ext = path.extname(filePath)
      if (ext === '.html') {
        const relative = path.relative(originalDestinationPath, filePath)
        links.push(`${websiteUrl}/${relative}`)
      }
    }
  })
  return links
}

const createSitemap = (destinationPath, websiteUrl) => {
  if (!websiteUrl) {
    logger('WARN', 'No website url provided')
    logger('WARN', 'Skipping sitemap.xml generation')
    return
  }

  logger('INFO', 'Generate sitemap.xml')

  const links = crawlDistFolder(destinationPath, websiteUrl, destinationPath)
  const options = {
    links,
    modifyDate: (new Date()).toJSON()
  }
  const templatePath = path.join(__dirname, '../templates/sitemap.pug')
  const render = pug.renderFile(templatePath, options)
  const outputPath = `${destinationPath}/sitemap.xml`
  
  fs.writeFileSync(outputPath, render)
}

module.exports = createSitemap
