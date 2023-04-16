const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://job-roadmap.ru:1323/',
      changeOrigin: true
    })
  )
}
