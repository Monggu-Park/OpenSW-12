const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/members', {
            target: 'http://localhost:8000', //접속하려는 서버의 루트 URL
            changeOrigin: true
        })
    );
};