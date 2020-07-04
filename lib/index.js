const path = require('path')

const { cleanup, copyAssets, createPages, createPosts } = require('./helpers')

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

// TODO copy assets from posts
// TODO sort blog posts
// TODO put proper link in post list
