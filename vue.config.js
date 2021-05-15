'use strict'
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// console.log(process.env)
console.log(process.env.VUE_APP_ERP_BASE_API)
console.log(process.env.VUE_APP_CBS_BASE_API)

const port = 8086

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    // contentBase: path.join(__dirname, 'src'),
    port: port,
    open: true,
    hot: true,
    hotOnly: true,
    lazy: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/erp': {
        target: 'http://bihutest.zeego.cc',
        ws: true,
        logLevel: 'debug',
        changeOrigin: true,
        pathRewrite: {
          '^/erp': ''
        }
      },
      '/cbs': {
        target: 'http://cbs-gateway.dev.ebsfw.com',
        ws: true,
        logLevel: 'debug',
        changeOrigin: true,
        pathRewrite: {
          '^/cbs': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@a': resolve('src/api')
      }
    }
  },
}
