const fs = require('fs-extra')
const path = require('path')
const pug = require('pug')
const slug = require('slug')

const getTitle = require('./getTitle')

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const createPost = async (postPath, destinationPath, date) => {
  const postTitle = await getTitle(`${postPath}/post.md`)  
  const options = {
    basedir: postPath,
    title: postTitle,
  }
  const render = pug.renderFile(path.join(__dirname, '../../src/layout/post.pug'), options)
  const postFilename = `${date}-${slug(postTitle)}.html`
  const outputPath = `${destinationPath}/posts/${postFilename}`
  
  fs.writeFileSync(outputPath, render)

  return {
    date,
    postFilename,
    postTitle
  }
}

const createPosts = async (srcPath, destinationPath) => {
  const postsPath = `${srcPath}/posts`
  const postsDirs = getDirectories(postsPath)
  const postsData = []

  await Promise.all(
    postsDirs.map(async postDir => {
      const postPath = `${postsPath}/${postDir}`
      const postData = await createPost(postPath, destinationPath, postDir)
      postsData.push(postData)
    })
  )

  return postsData
}

module.exports = createPosts
