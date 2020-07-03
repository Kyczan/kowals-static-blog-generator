const fs = require('fs')
const path = require('path')
const pug = require('pug')

const cleanup = require('./cleanup')

const srcPath = path.join(__dirname, '../src')
const destinationPath = path.join(__dirname, '../dist')

// cleanup destination folder
cleanup(destinationPath)

// get all pages
const pagesPath = `${srcPath}/pages`
const pages = fs.readdirSync(pagesPath)

pages.forEach(page => {
  const filePath = path.join(pagesPath, page)
  const render = pug.renderFile(filePath, {title: 'This is title'})
  const filename = path.parse(filePath).name
  const outputFilename = `${destinationPath}/${filename}.html`
   
  fs.writeFileSync(outputFilename, render)
})

// copy assets
const assetsPath = `${srcPath}/assets`
const assets = fs.readdirSync(assetsPath)

assets.forEach(asset => {
  const filePath = path.join(assetsPath, asset)
  fs.copyFileSync(filePath, `${destinationPath}/${asset}`);
})
