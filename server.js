const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const mimeTypes = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".json": "application/json",
};

http.createServer((req, res) => {
  let filePath = "." + req.url;

  if (filePath === "./") filePath = "./index.html";

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || "text/plain";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Arquivo não encontrado: " + filePath);
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });

}).listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:" + PORT);
});
