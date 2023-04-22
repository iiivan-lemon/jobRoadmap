const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://job-roadmap.ru/',
      changeOrigin: true
    })
  )
}
