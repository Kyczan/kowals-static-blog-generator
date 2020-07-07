#!/usr/bin/env node

const path = require('path')

const cleanup = require('./helpers/cleanup')
const createPages = require('./helpers/pages')
const createPosts = require('./helpers/posts')
const copyAssets = require('./helpers/assets')

;(async function(){
  // eslint-disable-next-line no-unused-vars
  const [ engine, scriptPath, source, destination ] = process.argv
  const dirname = process.cwd()
  
  const srcPath = path.join(dirname, source)
  const destinationPath = path.join(dirname, destination)

  // cleanup destination folder
  cleanup(destinationPath)

  // copy assets
  copyAssets(srcPath, destinationPath)

  // create blog posts
  const postsData = await createPosts(srcPath, destinationPath)

  // create main pages
  createPages(srcPath, destinationPath, postsData)
})()
