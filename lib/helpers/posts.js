const fs = require('fs-extra')
const lineByLine = require('n-readlines')
const pug = require('pug')
const slug = require('slug')

const formatDate = require('./formatDate')
const logger = require('./logger')

const getTitle = filePath => {
  const liner = new lineByLine(filePath)
  const line = liner.next()

  return line.toString('ascii').replace('# ','')
}

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const createPost = (srcPath, destinationPath, date) => {
  const postPath = `${srcPath}/posts/${date}`
  const postTitle = getTitle(`${postPath}/post.md`)
  const options = {
    basedir: postPath,
    title: postTitle,
    date: formatDate(date)
  }
  const render = pug.renderFile(`${srcPath}/layout/post.pug`, options)
  const postFilename = `${date}-${slug(postTitle)}.html`
  const outputPath = `${destinationPath}/posts/${postFilename}`

  fs.writeFileSync(outputPath, render)
  // copy assets
  if (fs.existsSync(`${postPath}/assets`)) {
    fs.copySync(`${postPath}/assets`, `${destinationPath}/posts/assets`)
  }

  return {
    date,
    postFilename,
    postTitle
  }
}

const createPosts = (srcPath, destinationPath) => {
  const postsPath = `${srcPath}/posts`
  if (!fs.existsSync(postsPath)) {
    logger('WARN', 'No blog posts available')
    return []
  }

  logger('INFO', 'Generating blog posts')

  const postsDirs = getDirectories(postsPath)
  const postsData = []

  postsDirs.map( postDir => {
    const postData = createPost(srcPath, destinationPath, postDir)
    postsData.push(postData)
  })

  return postsData
}

module.exports = createPosts
