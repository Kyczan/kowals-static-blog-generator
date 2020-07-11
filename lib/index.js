#!/usr/bin/env node

const path = require('path')

const logger = require('./helpers/logger')
const cleanup = require('./helpers/cleanup')
const createPages = require('./helpers/pages')
const createPosts = require('./helpers/posts')
const copyAssets = require('./helpers/assets')
const createSitemap = require('./helpers/sitemap')

;(async function(){
  // eslint-disable-next-line no-unused-vars
  const [ engine, scriptPath, source, destination, websiteUrl ] = process.argv

  logger('INFO', 'Welcome to kowals-static-blog-generator')

  if(!source || !destination) {
    logger('ERROR', 'Please provide at least source and destination parameter')
    process.exit(1)
  }

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

  // create sitemap.xml
  createSitemap(destinationPath, websiteUrl)

  logger('SUCCESS', 'Generating static site is completed!')
})()
