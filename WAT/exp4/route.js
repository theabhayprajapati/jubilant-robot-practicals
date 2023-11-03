const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8180;

const routes = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact': 'contact.html',
};

const server = http.createServer((req, res) => {
  const filePath = routes[req.url];

  if (filePath) {
    const file = path.join(__dirname, filePath);
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Route Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});