const fs = require('fs-extra')
const path = require('path')
const pug = require('pug')

const formatDate = require('./formatDate')
const logger = require('./logger')

const transformPostData = postData => {
  // sort by date, descending
  postData.sort((a, b) => (a.date > b.date ? -1 : 1))

  const transformedData = postData.map(post => {
    const date = formatDate(post.date)
    return {
      date,
      postTitle: post.postTitle,
      postFilename: `/posts/${post.postFilename}`
    }
  })

  return transformedData
}

const createPagesRecursive = (pagesPath, destinationPath, options) => {
  // create destination dir if needed
  fs.mkdirpSync(destinationPath)

  const pages = fs.readdirSync(pagesPath)

  pages.forEach(page => {
    const filePath = path.join(pagesPath, page)
    const stats = fs.statSync(filePath)

    if(stats.isDirectory()) {
      createPagesRecursive(filePath, `${destinationPath}/${page}`, options)
    } else {
      const render = pug.renderFile(filePath, options)
      const filename = path.parse(filePath).name
      const outputFilename = `${destinationPath}/${filename}.html`

      fs.writeFileSync(outputFilename, render)
    }
  })
}

const createPages = (srcPath, destinationPath, postsData) => {
  const pagesPath = `${srcPath}/pages`
  const options = {
    postsData: transformPostData(postsData)
  }

  logger('INFO', 'Generating static main pages')
  createPagesRecursive(pagesPath, destinationPath, options)
}

module.exports = createPages
