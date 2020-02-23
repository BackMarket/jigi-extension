#!/usr/bin/env node

// This scripts overwrites Create React App build script, in order to change its
// default behavior, to suit Browser Extension requirements.

const rewire = require('rewire')

// eslint-disable-next-line no-underscore-dangle
const requirePrivateVar = (script, name) => rewire(script).__get__(name)

const requireWebpackPlugin = name =>
  requirePrivateVar('react-scripts/config/webpack.config.js', name)

const config = requirePrivateVar('react-scripts/scripts/build.js', 'config')

const isPluginInstance = name => {
  const Plugin = requireWebpackPlugin(name)
  return plugin => plugin instanceof Plugin
}

function rewritePlugin(name, mapper) {
  const pluginIndex = config.plugins.findIndex(isPluginInstance(name))
  if (pluginIndex === -1) {
    throw new Error(`Could not find ${name} webpack plugin!`)
  }

  const newPlugin = mapper(config.plugins[pluginIndex])
  if (newPlugin) {
    config.plugins[pluginIndex] = newPlugin
  } else {
    config.plugins.splice(pluginIndex, 1)
  }
}

// Disable CSS & JS minification and sourcemaps
config.optimization.minimize = false
config.devtool = false
console.info('Disabled CSS/JS minification')

// Disable HTML minification
rewritePlugin('HtmlWebpackPlugin', plugin => {
  plugin.options.minify = false // eslint-disable-line no-param-reassign
  return plugin
})
console.info('Disabled HTML minification')

// Disable code splitting
// Read more: https://github.com/facebook/create-react-app/issues/5306#issuecomment-433425838
config.optimization.runtimeChunk = false
config.optimization.splitChunks = {
  cacheGroups: {
    default: false,
  },
}
console.info('Disabled code splitting')

// Remove hashname from .js file names
// Ex: build/static/js/main.57ddf3b4.js -> main.js
config.output.filename = config.output.filename.replace(
  '[name].[contenthash:8].js',
  '[name].js',
)
config.output.chunkFilename = config.output.chunkFilename.replace(
  '[name].[contenthash:8].chunk.js',
  '[name].js',
)
console.info('Disabled JS filenames hashes')

// Disable hashname from style files
rewritePlugin(
  'MiniCssExtractPlugin',
  plugin =>
    new plugin.constructor({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[name].chunk.css',
    }),
)
console.info('Disabled CSS filenames hashes')

// Disable hashname from media files
// Ex: build/static/media/logo.5d5d9eef.svg -> logo.svg
const lastModuleRule = config.module.rules[config.module.rules.length - 1]
lastModuleRule.oneOf.forEach(rule => {
  if (rule.options && rule.options.name) {
    rule.options.name = rule.options.name.replace(
      '[name].[hash:8].[ext]',
      '[name].[ext]',
    )
  }
})
console.info('Disabled media names hashs')

// Disable assets manifest (removes asset-manifest.json)
rewritePlugin('ManifestPlugin', () => null)
console.log('Disabled manifest plugin')
