const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  createProxyMiddleware({

    // Elfapi local target
    target: "http://localhost:5097",
    changeOrigin: true,
    logger: console,

    pathRewrite: (path, req) => {
      const match = req.originalUrl.match(/^\/([a-z]{2}-[a-z]{2})\/(.*)$/);
      if (!match) return path;
      return `/service/api/${match[2]}`;
    },

    on: {
      proxyReq: (proxyReq, req, res) => {
        const match = req.originalUrl.match(/^\/([a-z]{2}-[a-z]{2})\//);
        if (match) {
          proxyReq.setHeader("x-locale", match[1]);
        }
      },
      error: (err, req, res) => {
        console.error("proxy error", err);
        res.status(502).send("Bad gateway");
      }
    }
  })
);

app.listen(8080, () => {
  console.log("Proxy listening on http://localhost:8080");
});



