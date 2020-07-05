const path = require('path')

const cleanup = require('./helpers/cleanup')
const createPages = require('./helpers/pages')
const createPosts = require('./helpers/posts')
const copyAssets = require('./helpers/assets')

;(async function(){

  const srcPath = path.join(__dirname, '../src')
  const destinationPath = path.join(__dirname, '../dist')

  // cleanup destination folder
  cleanup(destinationPath)

  // copy assets
  copyAssets(srcPath, destinationPath)

  // create blog posts
  const postsData = await createPosts(srcPath, destinationPath)

  // create main pages
  createPages(srcPath, destinationPath, postsData)
})()
