const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://37.139.41.200:1323/',
      changeOrigin: true
    })
  )
}
