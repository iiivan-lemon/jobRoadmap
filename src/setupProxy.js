const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://109.120.182.94:1323/',
      changeOrigin: true
    })
  )
}
