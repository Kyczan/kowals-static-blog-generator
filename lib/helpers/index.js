const cleanup = require('./cleanup')
const getTitle = require('./getTitle')
const createPages = require('./pages')
const createPosts = require('./posts')
const copyAssets = require('./assets')

module.exports = {
  cleanup,
  copyAssets,
  createPages,
  createPosts,
  getTitle
}
