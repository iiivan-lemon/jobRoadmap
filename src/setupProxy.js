const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://89.208.85.17:1323/',
      changeOrigin: true
    })
  )
}
