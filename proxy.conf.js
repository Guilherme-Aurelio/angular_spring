const PROXY_CONFIG = [
  {
    "/login": {
      "target": "http://localhost:8080/login",
      "secure": false,
      "changeOrigin": true
    }
  }
];

module.exports = PROXY_CONFIG;
