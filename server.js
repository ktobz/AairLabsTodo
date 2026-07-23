const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DIST = path.join(__dirname, "dist");

const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".json": "application/json",
};

http
  .createServer((req, res) => {
    let filePath = path.join(DIST, req.url === "/" ? "index.html" : req.url);
    const ext = path.extname(filePath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        fs.readFile(path.join(DIST, "index.html"), (err2, data2) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data2);
        });
      } else {
        res.writeHead(200, { "Content-Type": MIME[ext] || "text/plain" });
        res.end(data);
      }
    });
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
