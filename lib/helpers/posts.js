const fs = require('fs-extra')
const pug = require('pug')
const slug = require('slug')

const getTitle = require('./getTitle')
const formatDate = require('./formatDate')

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const createPost = async (srcPath, destinationPath, date) => {
  const postPath = `${srcPath}/posts/${date}`
  const postTitle = await getTitle(`${postPath}/post.md`)  
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

const createPosts = async (srcPath, destinationPath) => {
  const postsPath = `${srcPath}/posts`
  if (!fs.existsSync(postsPath)) {
    return []
  }
  
  const postsDirs = getDirectories(postsPath)
  const postsData = []

  await Promise.all(
    postsDirs.map(async postDir => {
      const postData = await createPost(srcPath, destinationPath, postDir)
      postsData.push(postData)
    })
  )

  return postsData
}

module.exports = createPosts
